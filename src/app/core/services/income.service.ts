import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { SummaryTransaction, TransactionDetail } from '@models/transaction-detail.model';
import { BehaviorSubject, tap } from 'rxjs';
import { AccountService } from './account.service';
import { checkToken } from '@interceptors/token.interceptor';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  private apiUrl = `${environment.API_URL}/api`;
  incomes$ = new BehaviorSubject<TransactionDetail[]>([]);
  totalIncomes$ = new BehaviorSubject<number | null>(null);

  constructor(
    private http: HttpClient,
    private accountservice: AccountService,
  ) {}

  getIncomes(account_name?: string) {
    const url = new URL(`${this.apiUrl}/incomes`)
    if (account_name) {
      url.searchParams.set('account_name', account_name);
    }
    return this.http
    .get<SummaryTransaction>(url.toString(), { context: checkToken() })
    .pipe(
      tap((incomes) => {
        this.incomes$.next(incomes.transactionDetails);
        this.totalIncomes$.next(incomes.totalTransactions);
      })
    );
    
  }
}
