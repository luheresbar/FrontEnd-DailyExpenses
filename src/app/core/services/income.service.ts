import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import {
  SummaryTransaction,
  TransactionDetail,
} from '@models/transaction-detail.model';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { AccountService } from './account.service';
import { checkToken } from '@interceptors/token.interceptor';
import { TransactionService } from './transaction.service';
import { DateFilterService } from './date-filter.service';

@Injectable({
  providedIn: 'root',
})
export class IncomeService {
  private apiUrl = `${environment.API_URL}/api`;
  incomes$ = new BehaviorSubject<TransactionDetail[]>([]);
  totalIncomes$ = new BehaviorSubject<number | null>(null);

  constructor(
    private http: HttpClient,
    private dateFilterService: DateFilterService
  ) {}

  getIncomes(current_date?: string, next_date?: string) {
    const url = new URL(`${this.apiUrl}/incomes`);
    if (current_date && next_date) {
      url.searchParams.set('current_date', current_date);
      url.searchParams.set('next_date', next_date);
    }
    return this.http
      .get<SummaryTransaction>(url.toString(), { context: checkToken() })
      .pipe(
        tap((incomes) => {
          
          this.incomes$.next(incomes.transactionDetails);
          this.totalIncomes$.next(incomes.totalIncome);
        })
      );
  }

  getMonthlyIncomeTotal(current_date?: string, next_date?: string) {
    const url = new URL(`${this.apiUrl}/incomes/total`);
    if (current_date && next_date) {
      url.searchParams.set('current_date', current_date);
      url.searchParams.set('next_date', next_date);
    }
    return this.http
      .get<SummaryTransaction>(url.toString(), { context: checkToken() })
      .pipe(
        tap((incomes) => {
          this.totalIncomes$.next(incomes.totalIncome);
        })
      );
  }

  create(income: TransactionDetail) {
    return this.http
      .post<TransactionDetail>(`${this.apiUrl}/incomes/create`, income, {
        context: checkToken(),
      })
      .pipe(
        switchMap(() =>
          this.getIncomes(
            this.dateFilterService.currentDateFormatted$.value,
            this.dateFilterService.nextDateFormatted$.value
          )
        )
      );
  }

  update(income: TransactionDetail) {
    return this.http
      .put<TransactionDetail>(`${this.apiUrl}/incomes/update`, income, {
        context: checkToken(),
      })
      .pipe(
        switchMap(() =>
          this.getIncomes(
            this.dateFilterService.currentDateFormatted$.value,
            this.dateFilterService.nextDateFormatted$.value
          )
        )
      );
  }

  delete(incomeId: number) {
    return this.http
      .delete(`${this.apiUrl}/incomes/delete/${incomeId}`, {
        context: checkToken(),
      })
      .pipe(
        switchMap(() =>
          this.getIncomes(
            this.dateFilterService.currentDateFormatted$.value,
            this.dateFilterService.nextDateFormatted$.value
          )
        )
      );
  }

  updateTotalIncomes(total: number) {
    this.totalIncomes$.next(total);
  }
}
