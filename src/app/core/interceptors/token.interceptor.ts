import {
  HttpContext,
  HttpContextToken,
  HttpEvent,
  HttpHandler,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { TokenService } from '@services/token.service';
import { Observable, switchMap } from 'rxjs';

const CHECK_TOKEN = new HttpContextToken<boolean>(() => false);

export function checkToken() {
  return new HttpContext().set(CHECK_TOKEN, true);
}

export const tokenInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const tokenService = inject(TokenService);

  if (req.context.get(CHECK_TOKEN)) {
    const isValidToken = tokenService.isValidToken();
    if (isValidToken) {
      return addToken(req, next);
    } else {
      return updateAccessTokenAndRefreshToken(req, next);
    }
  }
  return next(req);
};

function addToken(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const tokenService = inject(TokenService);

  const accessToken = tokenService.getToken();
  if (accessToken) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
    });
    return next(authReq);
  }
  return next(req);
}
function updateAccessTokenAndRefreshToken(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const tokenService = inject(TokenService);
  const authService = inject(AuthService);

  const refreshToken = tokenService.getRefreshToken();
  const isvalidRefreshToken = tokenService.isValidRefreshToken();
  if (refreshToken && isvalidRefreshToken) {
    return authService
      .refreshToken(refreshToken)
      .pipe(switchMap(() => addToken(req, next)));
  }
  return next(req);
}