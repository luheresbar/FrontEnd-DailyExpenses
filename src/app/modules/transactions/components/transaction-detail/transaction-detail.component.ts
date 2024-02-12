import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TransactionDetail } from '@models/transaction-detail.model';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-transaction-detail',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FontAwesomeModule],
  templateUrl: './transaction-detail.component.html',
  styleUrl: './transaction-detail.component.scss'
})
export class TransactionDetailComponent {

  faArrowRight = faArrowRight;

  @Input() transaction!: TransactionDetail;

  getTransactionTypeClass(): string {
    switch (this.transaction.type) {
      case 'income':
        return 'income';
      case 'expense':
        return 'expense';
      case 'transfer':
        return 'transfer';
      default:
        return '';
    }
  }

}
