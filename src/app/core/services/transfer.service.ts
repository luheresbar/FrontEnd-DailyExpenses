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
export class TransferService {
  private apiUrl = `${environment.API_URL}/api`;
  transfers$ = new BehaviorSubject<TransactionDetail[]>([]);

  constructor(
    private http: HttpClient,
    private dateFilterService: DateFilterService
  ) {}

  getTransfers(current_date?: string, next_date?: string) {
    const url = new URL(`${this.apiUrl}/transfers`);
    if (current_date && next_date) {
      url.searchParams.set('current_date', current_date);
      url.searchParams.set('next_date', next_date);
    }
    return this.http
      .get<SummaryTransaction>(url.toString(), { context: checkToken() })
      .pipe(
        tap((transfers) => {
          this.transfers$.next(transfers.transactionDetails);
        })
      );
  }

  create(transfer: TransactionDetail) {
    return this.http
      .post<TransactionDetail>(`${this.apiUrl}/transfers/create`, transfer, {
        context: checkToken(),
      })
      .pipe(
        switchMap(() =>
          this.getTransfers(
            this.dateFilterService.currentDateFormatted$.value,
            this.dateFilterService.nextDateFormatted$.value
          )
        )
      );
  }

  update(transfer: TransactionDetail) {
    return this.http
      .put<TransactionDetail>(`${this.apiUrl}/transfers/update`, transfer, {
        context: checkToken(),
      })
      .pipe(
        switchMap(() =>
          this.getTransfers(
            this.dateFilterService.currentDateFormatted$.value,
            this.dateFilterService.nextDateFormatted$.value
          )
        )
      );
  }

  delete(transferId: number) {
    return this.http
      .delete(`${this.apiUrl}/transfers/delete/${transferId}`, {
        context: checkToken(),
      })
      .pipe(
        switchMap(() =>
          this.getTransfers(
            this.dateFilterService.currentDateFormatted$.value,
            this.dateFilterService.nextDateFormatted$.value
          )
        )
      );
  }
}
