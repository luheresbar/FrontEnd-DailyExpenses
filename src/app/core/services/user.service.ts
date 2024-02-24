import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { UpdateUserDto, UserProfile, UserResponse } from '@models/user.model';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
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
    return this.http.get<UserProfile>(`${this.apiUrl}/users`)
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

  // getDataUser() {
  //   return this.user$.getValue();
  // }

  update(user: UpdateUserDto) {
    return this.http
      .put<UserResponse>(`${this.apiUrl}/users/update`, user, { context: checkToken() })
      .pipe(
        switchMap(() => this.getProfile()),
      );
  }


}
