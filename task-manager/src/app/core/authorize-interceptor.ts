import {
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  filter,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { AuthService } from '../services/auth-service';

const BASE_API_GATEWAY = 'https://localhost:7280';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  const accessToken = authService.getAccessToken();

  let authReq = req;

  // Добавляем токен если есть
  if (accessToken) {
    authReq = addTokenHeader(authReq, accessToken);
  }

  authReq = addCoockie(authReq);

  // Если URL относительный — добавляем gateway
  if (!authReq.url.startsWith('http')) {
    authReq = authReq.clone({
      url: BASE_API_GATEWAY + authReq.url,
    });
  }

  // Обработка запроса и ошибок
  return next(authReq).pipe(
    catchError((error: any) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return handle401Error(authReq, next, authService);
      }
      return throwError(() => error);
    })
  );
};

function addTokenHeader(
  request: HttpRequest<any>,
  token: string
): HttpRequest<any> {
  return request.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
  });
}

function addCoockie(
  request: HttpRequest<any>
): HttpRequest<any> {
  return request.clone({
    withCredentials: true
  });
}


function handle401Error(
  request: HttpRequest<any>,
  next: HttpHandlerFn,
  authService: AuthService
): Observable<HttpEvent<any>> {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    return authService.refreshToken().pipe(
      switchMap((res) => {
        isRefreshing = false;
        authService.setAccessToken(res.accessToken);
        refreshTokenSubject.next(res.accessToken);
        return next(addTokenHeader(request, res.accessToken));
      }),
      catchError((err) => {
        isRefreshing = false;
        authService.logout();
        return throwError(() => err);
      })
    );
  } else {
    // Ждём, пока токен обновится
    return refreshTokenSubject.pipe(
      filter((token): token is string => token !== null),
      take(1),
      switchMap((token) => next(addTokenHeader(request, token)))
    );
  }
}
