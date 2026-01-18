import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import {
  BehaviorSubject,
  catchError,
  filter,
  finalize,
  switchMap,
  take,
  throwError,
} from 'rxjs';

const isRefreshing$ = new BehaviorSubject<boolean>(false);

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  // Пропускаем запросы на авторизацию без токена
  if (req.url.includes('/auth/token')) {
    return next(req);
  }

  const token = authService.token;

  if (!token) return next(req);

  // Если уже идёт обновление токена — ждём его завершения
  if (isRefreshing$.value) {
    return waitForRefresh(authService, req, next);
  }

  return next(addToken(req, token)).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse && error.status === 403) {
        return refreshAndProceed(authService, req, next);
      }
      return throwError(() => error);
    })
  );
};

const refreshAndProceed = (
  authService: AuthService,
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  if (!isRefreshing$.value) {
    isRefreshing$.next(true);

    return authService.refreshAuthToken().pipe(
      switchMap((res) => {
        return next(addToken(req, res.access_token));
      }),
      catchError((error) => {
        // При ошибке refresh — не пробуем дальше, logout уже вызван в authService
        return throwError(() => error);
      }),
      finalize(() => {
        // Гарантированно сбрасываем флаг, даже при ошибке
        isRefreshing$.next(false);
      })
    );
  }

  return waitForRefresh(authService, req, next);
};

const waitForRefresh = (
  authService: AuthService,
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  return isRefreshing$.pipe(
    filter((isRefreshing) => !isRefreshing),
    take(1), // Важно: берём только одно значение, чтобы не подписываться бесконечно
    switchMap(() => {
      const newToken = authService.token;
      if (!newToken) {
        return throwError(() => new Error('No token available after refresh'));
      }
      return next(addToken(req, newToken));
    })
  );
};

const addToken = (req: HttpRequest<any>, token: string) => {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
};
