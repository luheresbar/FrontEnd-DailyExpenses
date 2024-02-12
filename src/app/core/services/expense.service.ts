import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { BehaviorSubject, tap } from 'rxjs';
import { AccountService } from './account.service';
import { checkToken } from '@interceptors/token.interceptor';
import { SummaryExpenses, TransactionDetail } from '@models/transaction-detail.model';

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
  ) {}

  getExpenses(account_name?: string) {
    const url = new URL(`${this.apiUrl}/expenses`)
    if (account_name) {
      url.searchParams.set('account_name', account_name);
    }
    return this.http
    .get<SummaryExpenses>(url.toString(), { context: checkToken() })
    .pipe(
      tap((expense) => {
        this.expenses$.next(expense.expenses);
        this.totalExpense$.next(expense.totalExpense);
      })
    );
    
  }
}
