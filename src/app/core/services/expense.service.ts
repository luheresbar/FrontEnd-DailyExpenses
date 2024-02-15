import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@environments/environment';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { AccountService } from './account.service';
import { checkToken } from '@interceptors/token.interceptor';
import { SummaryTransaction, TransactionDetail } from '@models/transaction-detail.model';
import { TransactionService } from './transaction.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private apiUrl = `${environment.API_URL}/api`;
  expenses$ = new BehaviorSubject<TransactionDetail[]>([]);
  totalExpense$ = new BehaviorSubject<number | null>(null);

  constructor(
    private http: HttpClient,
    private accountservice: AccountService,
    private transactionService: TransactionService,
  ) {}

  getExpenses(account_name?: string) {
    const url = new URL(`${this.apiUrl}/expenses`)
    if (account_name) {
      url.searchParams.set('account_name', account_name);
    }
    return this.http
    .get<SummaryTransaction>(url.toString(), { context: checkToken() })
    .pipe(
      tap((expenses) => {
        this.expenses$.next(expenses.transactionDetails);
        this.totalExpense$.next(expenses.totalTransactions);
      })
    );
  }

  createExpense(expense: TransactionDetail) {
    return this.http
      .post<TransactionDetail>(`${this.apiUrl}/expenses/create`, expense, {
        context: checkToken(),
      })
      .pipe(
        switchMap(() => this.getExpenses()),
        switchMap(() => this.transactionService.getAll()),
        switchMap(() => this.accountservice.getAccounts())
      );
  }

  updateExpense(expense: TransactionDetail) {
    return this.http
      .put<TransactionDetail>(`${this.apiUrl}/expenses/update`, expense, {
        context: checkToken(),
      })
      .pipe(
        switchMap(() => this.getExpenses()),
        switchMap(() => this.transactionService.getAll()),
        switchMap(() => this.accountservice.getAccounts())
      );
  }

  deleteExpense(expenseId: number) {
    return this.http
      .delete(`${this.apiUrl}/expenses/delete/${expenseId}`, {
        context: checkToken(),
      })
      .pipe(
        switchMap(() => this.getExpenses()),
        switchMap(() => this.accountservice.getAccounts()),
        switchMap(() => this.transactionService.getAll())
      );
  }
}
