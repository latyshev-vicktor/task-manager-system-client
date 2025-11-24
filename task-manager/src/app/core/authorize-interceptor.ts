import {
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  catchError,
  filter,
  switchMap,
  take,
  throwError,
  finalize,
} from 'rxjs';
import { AuthService } from '../services/auth-service';
import { TuiAlertService } from '@taiga-ui/core';

const BASE_API_GATEWAY = 'https://localhost:7280';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const alertService = inject(TuiAlertService);

  // Подготавливаем запрос
  const authReq = prepareRequest(req, authService);

  // Обработка запроса и ошибок
  return next(authReq).pipe(
    catchError((error: any) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return handle401Error(authReq, next, authService, router);
      }
      return throwError(() => error);
    })
  );
};

function prepareRequest(
  req: HttpRequest<any>,
  authService: AuthService
): HttpRequest<any> {
  let authReq = req;

  // Добавляем base URL если URL относительный
  if (!authReq.url.startsWith('http')) {
    authReq = authReq.clone({
      url: BASE_API_GATEWAY + authReq.url,
    });
  }

  // Добавляем credentials для cookie
  authReq = authReq.clone({
    withCredentials: true,
  });

  // Добавляем токен если есть
  let accessToken = authService.getAccessToken();
  accessToken = null;
  if (accessToken) {
    authReq = authReq.clone({
      setHeaders: { Authorization: `Bearer ${accessToken}` },
    });
  }

  return authReq;
}

function handle401Error(
  request: HttpRequest<any>,
  next: HttpHandlerFn,
  authService: AuthService,
  router: Router
): Observable<HttpEvent<any>> {
  // Проверяем, не является ли это запросом на refresh
  const isRefreshEndpoint = 
    request.url.includes('/refresh') || 
    request.url.includes('/api/auth/refresh');

  if (isRefreshEndpoint) {
    isRefreshing = false;
    refreshTokenSubject.next(null);
    authService.logout();
    router.navigate(['/login']);
    return throwError(() => new Error('Refresh token expired'));
  }

  // Если уже идет процесс обновления токена
  if (isRefreshing) {
    return refreshTokenSubject.pipe(
      filter((token): token is string => token !== null),
      take(1),
      switchMap((token) => {
        const retryReq = request.clone({
          setHeaders: { Authorization: `Bearer ${token}` },
        });
        return next(retryReq);
      })
    );
  }

  // Начинаем процесс обновления токена
  isRefreshing = true;
  refreshTokenSubject.next(null);

  return authService.refreshToken().pipe(
    switchMap((res) => {
      const newToken = res.accessToken;
      authService.setAccessToken(newToken);
      refreshTokenSubject.next(newToken);

      const retryReq = request.clone({
        setHeaders: { Authorization: `Bearer ${newToken}` },
      });
      return next(retryReq);
    }),
    catchError((err) => {
      authService.logout();
      router.navigate(['/login']);
      return throwError(() => err);
    }),
    finalize(() => {
      isRefreshing = false;
      setTimeout(() => {
        refreshTokenSubject.next(null);
      }, 100);
    })
  );
}