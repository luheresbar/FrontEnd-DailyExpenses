import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@environments/environment';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { checkToken } from '@interceptors/token.interceptor';
import {
  SummaryTransaction,
  TransactionDetail,
} from '@models/transaction-detail.model';
import { DateFilterService } from './date-filter.service';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private apiUrl = `${environment.API_URL}/api`;
  expenses$ = new BehaviorSubject<TransactionDetail[]>([]);
  totalExpenses$ = new BehaviorSubject<number | null>(null);

  constructor(
    private http: HttpClient,
    private dateFilterService: DateFilterService
  ) {}

  getExpenses(current_date?: string, next_date?: string) {
    const url = new URL(`${this.apiUrl}/expenses`);
    if (current_date && next_date) {
      url.searchParams.set('current_date', current_date);
      url.searchParams.set('next_date', next_date);
    }
    return this.http
      .get<SummaryTransaction>(url.toString(), { context: checkToken() })
      .pipe(
        tap((expenses) => {
          this.expenses$.next(expenses.transactionDetails);
          this.totalExpenses$.next(expenses.totalExpense);
        })
      );
  }
  getMonthlyExpenseTotal(current_date?: string, next_date?: string) {
    const url = new URL(`${this.apiUrl}/expenses/total`);
    if (current_date && next_date) {
      url.searchParams.set('current_date', current_date);
      url.searchParams.set('next_date', next_date);
    }
    return this.http
      .get<SummaryTransaction>(url.toString(), { context: checkToken() })
      .pipe(
        tap((expenses) => {
          this.totalExpenses$.next(expenses.totalExpense);
        })
      );
  }

  create(expense: TransactionDetail) {
    return this.http
      .post<TransactionDetail>(`${this.apiUrl}/expenses/create`, expense, {
        context: checkToken(),
      })
      .pipe(
        switchMap(() =>
          this.getExpenses(
            this.dateFilterService.currentDateFormatted$.value,
            this.dateFilterService.nextDateFormatted$.value
          )
        )
      );
  }

  update(expense: TransactionDetail) {
    return this.http
      .put<TransactionDetail>(`${this.apiUrl}/expenses/update`, expense, {
        context: checkToken(),
      })
      .pipe(
        switchMap(() =>
          this.getExpenses(
            this.dateFilterService.currentDateFormatted$.value,
            this.dateFilterService.nextDateFormatted$.value
          )
        )
      );
  }

  delete(expenseId: number) {
    return this.http
      .delete(`${this.apiUrl}/expenses/delete/${expenseId}`, {
        context: checkToken(),
      })
      .pipe(
        switchMap(() =>
          this.getExpenses(
            this.dateFilterService.currentDateFormatted$.value,
            this.dateFilterService.nextDateFormatted$.value
          )
        )
      );
  }

  updateTotalExpenses(total: number) {
    this.totalExpenses$.next(total);
  }
}
