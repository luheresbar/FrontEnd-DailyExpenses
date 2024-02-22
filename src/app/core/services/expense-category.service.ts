import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { Category, CategoryDto } from '@models/category.model';
import { BehaviorSubject, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpenseCategoryService {
  private apiUrl = `${environment.API_URL}/api`;
  categories$ = new BehaviorSubject<CategoryDto[]>([]);

  constructor(private http: HttpClient) {}

  getExpenseCategories() {
    return this.http
      .get<CategoryDto[]>(`${this.apiUrl}/expense-categories`, {
        context: checkToken(),
      })
      .pipe(
        tap((categories) => {
          this.categories$.next(categories);
        })
      );
  }

  createExpenseCategory(category: Category) {
    return this.http
      .post<CategoryDto>(`${this.apiUrl}/expense-categories/create`, category, {
        context: checkToken(),
      })
      .pipe(switchMap(() => this.getExpenseCategories()));
  }

  deleteExpenseCategory(category: Category) {
    return this.http
      .delete(`${this.apiUrl}/expense-categories/delete`, {
        context: checkToken(),
        body: category
      })
      .pipe(
        switchMap(() => this.getExpenseCategories()),
      );
  }
}
