import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { SummaryTransaction, TransactionDetail } from '@models/transaction-detail.model';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private apiUrl = `${environment.API_URL}/api`;
  transactions$ = new BehaviorSubject<TransactionDetail[]>([]);
  totalExpenses$ = new BehaviorSubject<number | null>(null);
  totalIncomes$ = new BehaviorSubject<number | null>(null);

  constructor(private http: HttpClient) {}

  getAll(current_date?: string, next_date?: string) {
    const url = new URL(`${this.apiUrl}/transactions`);
    if (current_date && next_date) {
      url.searchParams.set('current_date', current_date);
      url.searchParams.set('next_date', next_date);
    }
    return this.http
      .get<SummaryTransaction>(url.toString(), { context: checkToken() })
      .pipe(
        tap((transactions) => {
          this.transactions$.next(transactions.transactionDetails);
          this.totalExpenses$.next(transactions.totalExpense);
          this.totalIncomes$.next(transactions.totalIncome);
        })
      );
  }
}