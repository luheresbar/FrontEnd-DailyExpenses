import { Injectable } from '@angular/core';

import { getCookie, setCookie, removeCookie } from 'typescript-cookie';
import { jwtDecode, JwtPayload } from "jwt-decode";

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  saveToken(token: string) {
    setCookie('token-dailyExpense', token, { expires: 365, path: '/' });
  }

  getToken() {
    const token = getCookie('token-dailyExpense');
    return token;
  }

  removeToken() {
    removeCookie('token-dailyExpense');
  }

  saveRefreshToken(token: string) {
    setCookie('refresh-token-dailyExpense', token, { expires: 365, path: '' });
  }

  getRefreshToken() {
    const refreshToken = getCookie('refresh-token-dailyExpense');
    return refreshToken;
  }

  removeRefreshToken() {
    removeCookie('refresh-token-dailyExpense');
  }

  isValidToken() {
    const token = this.getToken();
    if(!token) {
      return false;
    }
    const decodeToken = jwtDecode<JwtPayload>(token);
    if(decodeToken && decodeToken?.exp) {
      const tokenExpDate = new Date(0);
      tokenExpDate.setUTCSeconds(decodeToken.exp);
      const today = new Date();
      return tokenExpDate.getTime() > today.getTime();
    }
    return false;
  }

  isValidRefreshToken() {
    const refreshToken = this.getRefreshToken();
    if(!refreshToken) {
      return false;
    }
    const decodeToken = jwtDecode<JwtPayload>(refreshToken);
    if(decodeToken && decodeToken?.exp) {
      const tokenExpDate = new Date(0);
      tokenExpDate.setUTCSeconds(decodeToken.exp);
      const today = new Date();
      return tokenExpDate.getTime() > today.getTime();
    }
    return false;
  }
}
