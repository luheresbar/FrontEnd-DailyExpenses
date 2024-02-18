import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, inject } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TransactionDetail } from '@models/transaction-detail.model';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { DialogTransactionComponent } from '@shared/components/dialog-transaction/dialog-transaction.component';
import { Dialog, DialogModule } from '@angular/cdk/dialog';

@Component({
  selector: 'app-transaction-detail',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FontAwesomeModule, DialogModule],
  templateUrl: './transaction-detail.component.html',
  styleUrl: './transaction-detail.component.scss',
})
export class TransactionDetailComponent {
  @Input() transaction!: TransactionDetail;
  faArrowRight = faArrowRight;
  formattedTransactionDate: string | null = '';

  constructor(
    private dialog: Dialog,

    ) {
  }
  
  ngOnInit() {
    this.formatDate();
  }

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

  openDialogViewTransaction() {
    this.dialog.open(DialogTransactionComponent, {
      minWidth: '300px',
      width: '100%',
      height: '100vh',
      autoFocus: false,
      data: {
        type: this.transaction.type,
        id: this.transaction.id,
        description: this.transaction.description,
        date: this.transaction.date,
        amount: this.transaction.amount,
        category: this.transaction.category,
        sourceAccountName: this.transaction.sourceAccountName,
        destinationAccountName: this.transaction.destinationAccountName,
      },
    });
  }

  formatDate() {
    if (this.transaction.date != null) {

      const dateReceived: string = this.transaction.date;
      const date: Date = new Date(dateReceived);

      this.formattedTransactionDate = new DatePipe('en-US').transform(
        date,'EEE, dd'
      );
    }
  }
}
