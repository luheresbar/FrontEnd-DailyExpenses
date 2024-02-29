import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AccountDetailComponent } from '../../components/account-detail/account-detail.component';
import { AccountLayoutComponent } from '../../../layout/pages/account-layout/account-layout.component';
import { Account } from '@models/account.model';
import { AccountService } from '@services/account.service';

@Component({
  selector: 'app-account-summary',
  standalone: true,
  imports: [
    CommonModule, 
    AccountLayoutComponent,
    AccountDetailComponent
  ],
  templateUrl: './account-summary.component.html',
  styleUrl: './account-summary.component.scss'
})
export class AccountSummaryComponent {

  showTransactionFilter: boolean = false;
  showDateFilter: boolean = false;
  showTotalBalance: boolean = true;


  enabledAccounts$: Account[] = [];
  disabledAccounts$: Account[] = [];

  constructor(
    private accountService: AccountService,
  ) {}

  ngOnInit() {

    this.accountService.getAccounts().subscribe();

    this.accountService.enabledAccounts$.subscribe( accounts => {
      this.enabledAccounts$ = accounts;
    });
    this.accountService.disabledAccounts$.subscribe( accounts => {
      this.disabledAccounts$ = accounts;
    });
  }

}
