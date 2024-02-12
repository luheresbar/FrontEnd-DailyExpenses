import { Injectable } from '@angular/core';
import { jwtDecode, JwtPayload } from "jwt-decode";

import * as tsCookie from 'typescript-cookie';
const cookieFunctions = typeof document !== 'undefined' ? tsCookie : null;

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(token: string) {
    if (cookieFunctions && cookieFunctions.setCookie) {
      cookieFunctions.setCookie('token-dailyExpense', token, { expires: 365, path: '/' });
    }
  }

  getToken() {
    if (cookieFunctions && cookieFunctions.getCookie) {
      const token = cookieFunctions.getCookie('token-dailyExpense');
      return token;
    }
    return null;
  }

  removeToken() {
    if (cookieFunctions && cookieFunctions.removeCookie) {
      cookieFunctions.removeCookie('token-dailyExpense');

    }
  }

  saveRefreshToken(token: string) {
    if (cookieFunctions && cookieFunctions.setCookie) {
      cookieFunctions.setCookie('refresh-token-dailyExpense', token, { expires: 365, path: '/' });
    }
  }

  getRefreshToken() {
    if (cookieFunctions && cookieFunctions.getCookie) {
      const refreshToken = cookieFunctions.getCookie('refresh-token-dailyExpense');
      return refreshToken;
    }
    return null;
  }

  removeRefreshToken() {
    if (cookieFunctions && cookieFunctions.removeCookie) {
      cookieFunctions.removeCookie('refresh-token-dailyExpense');
      console.log('eliminado refresh token');
      
    }
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



// El anterior codigo se colocó con el fin de solucionar un error de ERROR ReferenceError: document is not defined en node_modules/typescript-cookie/dist/typescript-cookie.mjs:45:31)

// import { Injectable } from '@angular/core';

// import { getCookie, setCookie, removeCookie } from 'typescript-cookie';
// import { jwtDecode, JwtPayload } from "jwt-decode";

// @Injectable({
//   providedIn: 'root',
// })
// export class TokenService {
//   constructor() {}

//   saveToken(token: string) {
//     setCookie('token-dailyExpense', token, { expires: 365, path: '/' });
//   }

//   getToken() {
//     const token = getCookie('token-dailyExpense');
//     return token;
//   }

//   removeToken() {
//     removeCookie('token-dailyExpense');
//   }

//   saveRefreshToken(token: string) {
//     setCookie('refresh-token-dailyExpense', token, { expires: 365, path: '/' });
//   }

//   getRefreshToken() {
//     const refreshToken = getCookie('refresh-token-dailyExpense');
//     return refreshToken;
//   }

//   removeRefreshToken() {
//     removeCookie('refresh-token-dailyExpense');
//   }

//   isValidToken() {
//     const token = this.getToken();
//     if(!token) {
//       return false;
//     }
//     const decodeToken = jwtDecode<JwtPayload>(token);
//     if(decodeToken && decodeToken?.exp) {
//       const tokenExpDate = new Date(0);
//       tokenExpDate.setUTCSeconds(decodeToken.exp);
//       const today = new Date();
//       return tokenExpDate.getTime() > today.getTime();
//     }
//     return false;
//   }

//   isValidRefreshToken() {
//     const refreshToken = this.getRefreshToken();
//     if(!refreshToken) {
//       return false;
//     }
//     const decodeToken = jwtDecode<JwtPayload>(refreshToken);
//     if(decodeToken && decodeToken?.exp) {
//       const tokenExpDate = new Date(0);
//       tokenExpDate.setUTCSeconds(decodeToken.exp);
//       const today = new Date();
//       return tokenExpDate.getTime() > today.getTime();
//     }
//     return false;
//   }
// }
