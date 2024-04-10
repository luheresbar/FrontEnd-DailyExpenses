import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TransactionDetail } from '@models/transaction-detail.model';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { DialogTransactionComponent } from '../dialog-transaction/dialog-transaction.component';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(
    private dialog: Dialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,

    ) {
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
      // minWidth: '300px',
      width: 'auto',
      // height: '100vh',
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

  // addParamsToUrl() {
  //   const transactionType = `edit_${this.transaction.type}_id`;
  //   const transactionId = this.transaction.id;

  //   this.router.navigate([], {
  //     relativeTo: this.activatedRoute,
  //     queryParams: { [transactionType]: transactionId },
  //     queryParamsHandling: 'merge'
  //   });
  // }

}
