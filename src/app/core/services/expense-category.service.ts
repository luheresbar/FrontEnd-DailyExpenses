import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { Category } from '@models/category.model';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseCategoryService {

  private apiUrl = `${environment.API_URL}/api`;
  categories$ = new BehaviorSubject<Category[]>([]);

  constructor(
    private http: HttpClient,

  ) { }

  getExpenseCategories() {
      return this.http.get<Category[]>(`${this.apiUrl}/expense-categories`,  { context: checkToken() })
      .pipe(
        tap(categories => {
          this.categories$.next(categories);
        })
      )
    }
}
