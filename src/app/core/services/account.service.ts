import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { Account, SummaryAccountsDto } from '@models/account.model';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl = `${environment.API_URL}/api`;
  money$ = new BehaviorSubject<number | null>(null);
  enabledAccounts$ = new BehaviorSubject<Account[]>([]);
  disabledAccounts$ = new BehaviorSubject<Account[]>([]);

  constructor(
    private http: HttpClient,
  ) { }

  availableMoney() {
    return this.http.get<number>(`${this.apiUrl}/accounts/available-money`, { context: checkToken() })
    .pipe(
      tap(money => {
        this.money$.next(money)
      })
    )
  }

  getAccounts() {
    return this.http.get<SummaryAccountsDto>(`${this.apiUrl}/accounts`, { context: checkToken() })
    .pipe(
      tap(accounts => {
        this.enabledAccounts$.next(accounts.enabledAccounts);
        this.disabledAccounts$.next(accounts.disabledAccounts);
        this.money$.next(accounts.totalAvailableMoney);
      })
    )
  }
}
