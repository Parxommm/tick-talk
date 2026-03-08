import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { TokenResponse } from './auth.interface';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private cookieService = inject(CookieService);
  private router = inject(Router);

  private readonly baseApiUrl = 'https://icherniakov.ru/yt-course/auth/';
  private readonly cookiePath = '/';

  private _token: string | null = null;
  private _refreshToken: string | null = null;

  /**
   * Геттер для токена — автоматически загружает из cookies если нужно
   */
  get token(): string | null {
    if (!this._token) {
      this._token = this.cookieService.get('token') || null;
    }
    return this._token;
  }

  /**
   * Геттер для refresh токена — автоматически загружает из cookies если нужно
   */
  get refreshToken(): string | null {
    if (!this._refreshToken) {
      this._refreshToken = this.cookieService.get('refreshToken') || null;
    }
    return this._refreshToken;
  }

  get isAuth(): boolean {
    return !!this.token;
  }

  login(payload: { username: string; password: string }) {
    const fd = new FormData();
    fd.append('username', payload.username);
    fd.append('password', payload.password);
    return this.http.post<TokenResponse>(`${this.baseApiUrl}token`, fd).pipe(
      tap((val) => {
        this.saveTokens(val);
      })
    );
  }

  refreshAuthToken() {
    return this.http
      .post<TokenResponse>(`${this.baseApiUrl}refresh`, {
        refresh_token: this.refreshToken,
      })
      .pipe(
        tap((val) => this.saveTokens(val)),
        catchError((err) => {
          this.logout('session_expired');
          return throwError(() => err);
        })
      );
  }

  logout(reason?: 'session_expired') {
    this.cookieService.delete('token', this.cookiePath);
    this.cookieService.delete('refreshToken', this.cookiePath);
    this.cookieService.deleteAll();
    this._token = null;
    this._refreshToken = null;
    this.router.navigate(['/login'], {
      queryParams: reason === 'session_expired' ? { sessionExpired: 'true' } : undefined,
    });
  }

  saveTokens(res: TokenResponse) {
    this._token = res.access_token;
    this._refreshToken = res.refresh_token;

    this.cookieService.set('token', this._token, undefined, this.cookiePath);
    this.cookieService.set('refreshToken', this._refreshToken, undefined, this.cookiePath);
  }
}
