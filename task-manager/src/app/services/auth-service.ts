import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

interface LoginResponse {
  accessToken: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _baseUrl = "/autentication-service/api/account";
  private readonly accessTokenKey = 'access_token';
  private isRefreshing = false;
  private http = inject(HttpClient);
  private router = inject(Router);

  private accessToken$ = new BehaviorSubject<string | null>(this.getAccessToken());

  login(email: string | null, password: string | null): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this._baseUrl}/login`, { email, password }).pipe(
      tap((res) => {
        localStorage.setItem(this.accessTokenKey, res.accessToken);
        this.accessToken$.next(res.accessToken);
      })
    );
  }

  logout() : Observable<any> {
    return this.http.post(`${this._baseUrl}/logout`, {}).pipe(
      tap((res) => {
        localStorage.removeItem(this.accessTokenKey);
        this.accessToken$.next(null);
        this.router.navigate(['/login']);
      })
    )
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  setAccessToken(token: string) {
    localStorage.setItem(this.accessTokenKey, token);
  }

  refreshToken(): Observable<{ accessToken: string }> {
    return this.http.get<{ accessToken: string }>(`${this._baseUrl}/refresh-token`).pipe(
      tap((res) => {
        localStorage.setItem(this.accessTokenKey, res.accessToken);
        this.accessToken$.next(res.accessToken);
      })
    );
  }

  get tokenChanges$(): Observable<string | null> {
    return this.accessToken$.asObservable();
  }
}