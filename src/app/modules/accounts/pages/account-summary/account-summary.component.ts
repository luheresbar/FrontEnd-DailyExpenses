import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TransactionLayoutComponent } from '../../../layout/pages/transaction-layout/transaction-layout.component';

@Component({
  selector: 'app-account-summary',
  standalone: true,
  imports: [CommonModule, TransactionLayoutComponent],
  templateUrl: './account-summary.component.html',
  styleUrl: './account-summary.component.scss'
})
export class AccountSummaryComponent {

  showTransactionFilter: boolean = false;
  showDateFilter: boolean = false;

}
