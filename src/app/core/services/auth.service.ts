import { Injectable } from '@angular/core';

import { environment } from '@environments/environment';
import { TokenService } from '@services/token.service';
import { RegisterUserDTO, UserProfile } from '../models/user.model';
import { switchMap, tap } from 'rxjs/operators';
import { ResponseLogin } from '../models/auth.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.API_URL}/api/auth`;

  constructor(
    private http: HttpClient, 
    private tokenService: TokenService,
    ) {}

  login(email: string, password: string) {
    return this.http.post<ResponseLogin>(`${this.apiUrl}/login`, { email, password })
    .pipe(
      tap(response => {
        this.tokenService.saveToken(response.access_token);
        this.tokenService.saveRefreshToken(response.refresh_token);
      })
    )
  }

  refreshToken(refresh_token: string) {
    return this.http.post<ResponseLogin>(`${this.apiUrl}/refresh-token`, { refresh_token } )
    .pipe(
      tap(response => {
        this.tokenService.saveToken(response.access_token);
        this.tokenService.saveRefreshToken(response.refresh_token);
        
      })
    );
  }

  register(dto: RegisterUserDTO) {
    return this.http.post<UserProfile>(`${this.apiUrl}/register`, dto);
  }

  registerAndLogin(dtoRegister: RegisterUserDTO) {
    return this.register(dtoRegister).pipe(
      switchMap(() => this.login(dtoRegister.email, dtoRegister.password))
    );
  }

  isAvailable(email: string) {
    return this.http.post<{ isAvailable: boolean }>(
      `${this.apiUrl}/is-available`,
      { email }
    );
  }

  recovery(email: string) {
    return this.http.post(
      `${this.apiUrl}/recovery`,
      { email }
    );
  }

  changePassword(token: string, newPassword: string) {
    return this.http.post(`${this.apiUrl}/change-password`, { token, newPassword })
  }

  logout() {
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
  }

}
