import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { Category, CategoryDto } from '@models/category.model';
import { BehaviorSubject, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IncomeCategoryService {
  private apiUrl = `${environment.API_URL}/api`;
  categories$ = new BehaviorSubject<CategoryDto[]>([]);

  constructor(private http: HttpClient) {}

  getIncomeCategories() {
    return this.http
      .get<CategoryDto[]>(`${this.apiUrl}/income-categories`, {
        context: checkToken(),
      })
      .pipe(
        tap((categories) => {
          this.categories$.next(categories);
        })
      );
  }

  createIncomeCategory(category: Category) {
    return this.http
      .post<CategoryDto>(`${this.apiUrl}/income-categories/create`, category, {
        context: checkToken(),
      })
      .pipe(switchMap(() => this.getIncomeCategories()));
  }

  deleteIncomeCategory(category: Category) {
    return this.http
      .delete(`${this.apiUrl}/income-categories/delete`, {
        context: checkToken(),
        body: category,
      })
      .pipe(switchMap(() => this.getIncomeCategories()));
  }
}
