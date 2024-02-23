import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { Category, CategoryDto, SummaryCategoryDto } from '@models/category.model';
import { BehaviorSubject, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IncomeCategoryService {
  private apiUrl = `${environment.API_URL}/api`;
  enabledCategories$ = new BehaviorSubject<CategoryDto[]>([]);
  disabledCategories$ = new BehaviorSubject<CategoryDto[]>([]);

  constructor(private http: HttpClient) {}

  getIncomeCategories() {
    return this.http
      .get<SummaryCategoryDto>(`${this.apiUrl}/income-categories`, {
        context: checkToken(),
      })
      .pipe(
        tap((categories) => {
          this.enabledCategories$.next(categories.enabledCategories);
          this.disabledCategories$.next(categories.disabledCategories);
        })
      );
  }

  createCategory(category: Category) {
    return this.http
      .post<CategoryDto>(`${this.apiUrl}/income-categories/create`, category, {
        context: checkToken(),
      })
      .pipe(switchMap(() => this.getIncomeCategories()));
  }

  updateCategory(category: Category) {
    return this.http
      .put<CategoryDto>(`${this.apiUrl}/income-categories/update`, category, {
        context: checkToken(),
      })
      .pipe(switchMap(() => this.getIncomeCategories()));
  }


  deleteCategory(category: Category) {
    return this.http
      .delete(`${this.apiUrl}/income-categories/delete`, {
        context: checkToken(),
        body: category,
      })
      .pipe(switchMap(() => this.getIncomeCategories()));
  }
}
