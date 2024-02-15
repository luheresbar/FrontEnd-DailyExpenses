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
export class TransferService {

  private apiUrl = `${environment.API_URL}/api`;
  transfers$ = new BehaviorSubject<TransactionDetail[]>([]);

  constructor(
    private http: HttpClient,
    private accountservice: AccountService,
    private transactionService: TransactionService,
  ) {}

  getTransfers(account_name?: string) {
    const url = new URL(`${this.apiUrl}/transfers`)
    if (account_name) {
      url.searchParams.set('account_name', account_name);
    }
    return this.http
    .get<SummaryTransaction>(url.toString(), { context: checkToken() })
    .pipe(
      tap((transfers) => {
        this.transfers$.next(transfers.transactionDetails);
      })
    )
  }

  createTransfer(transfer: TransactionDetail) {
    return this.http
      .post<TransactionDetail>(`${this.apiUrl}/transfers/create`, transfer, {
        context: checkToken(),
      })
      .pipe(
        switchMap(() => this.getTransfers()),
        switchMap(() => this.transactionService.getAll()),
        switchMap(() => this.accountservice.getAccounts())
      );
  }

  updateTransfer(transfer: TransactionDetail) {
    return this.http
      .put<TransactionDetail>(`${this.apiUrl}/transfers/update`, transfer, {
        context: checkToken(),
      })
      .pipe(
        switchMap(() => this.getTransfers()),
        switchMap(() => this.transactionService.getAll()),
        switchMap(() => this.accountservice.getAccounts())
      );
  }

  deletetransfer(transferId: number) {
    return this.http
      .delete(`${this.apiUrl}/transfers/delete/${transferId}`, {
        context: checkToken(),
      })
      .pipe(
        switchMap(() => this.getTransfers()),
        switchMap(() => this.accountservice.getAccounts())
      );
  }


}
