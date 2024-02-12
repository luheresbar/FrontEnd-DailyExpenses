import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { User, UserResponse } from '@models/user.model';
import { BehaviorSubject, tap } from 'rxjs';
import { TokenService } from './token.service';
import { checkToken } from '@interceptors/token.interceptor';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `${environment.API_URL}/api`;
  user$ = new BehaviorSubject<UserResponse | null>(null);


  constructor(
    private http: HttpClient,

  ) { }

  getAll() {
    return this.http.get<User>(`${this.apiUrl}/users`)
  }

  getProfile() {
    // const token = this.tokenService.getToken(); // se utilizó antes de inplementar el tokenInterceptor
    // {headers:{Authorization:`Bearer ${token}`}
    return this.http.get<UserResponse>(`${this.apiUrl}/users/user`, { context: checkToken() })
    .pipe(
      tap(user => {
        this.user$.next(user)
      })
    )
  }

  getDataUser() {
    return this.user$.getValue();
  }
}
