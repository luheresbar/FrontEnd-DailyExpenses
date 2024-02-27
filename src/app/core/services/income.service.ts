import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { SummaryTransaction, TransactionDetail } from '@models/transaction-detail.model';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { AccountService } from './account.service';
import { checkToken } from '@interceptors/token.interceptor';
import { TransactionService } from './transaction.service';

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
    private transactionService: TransactionService,
  ) {}

  getIncomes(current_date?: string, next_date?: string) {
    const url = new URL(`${this.apiUrl}/incomes`)
    if (current_date && next_date) {
      url.searchParams.set('current_date', current_date);
      url.searchParams.set('next_date', next_date);
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

  create(income: TransactionDetail) {
    return this.http
      .post<TransactionDetail>(`${this.apiUrl}/incomes/create`, income, {
        context: checkToken(),
      })
      .pipe(
        switchMap(() => this.getIncomes()),
        switchMap(() => this.transactionService.getAll()),
        switchMap(() => this.accountservice.getAccounts())
      );
  }

  update(income: TransactionDetail) {
    return this.http
      .put<TransactionDetail>(`${this.apiUrl}/incomes/update`, income, {
        context: checkToken(),
      })
      .pipe(
        switchMap(() => this.getIncomes()),
        switchMap(() => this.transactionService.getAll()),
        switchMap(() => this.accountservice.getAccounts())
      );
  }

  delete(incomeId: number) {
    return this.http
      .delete(`${this.apiUrl}/incomes/delete/${incomeId}`, {
        context: checkToken(),
      })
      .pipe(
        switchMap(() => this.getIncomes()),
        switchMap(() => this.accountservice.getAccounts()),
        switchMap(() => this.transactionService.getAll())
      );
  }

}
