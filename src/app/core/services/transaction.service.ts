import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { TransactionDetail } from '@models/transaction-detail.model';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private apiUrl = `${environment.API_URL}/api`;
  transactions$ = new BehaviorSubject<TransactionDetail[]>([]);


  constructor(
    private http: HttpClient,
  ) { }

  getAll() {
    return this.http.get<TransactionDetail[]>(`${this.apiUrl}/transactions`, { context: checkToken() })
    .pipe(
      tap(transactions => {
        this.transactions$.next(transactions)
      })
    )
  }


}
