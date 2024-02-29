import { Component, Inject } from '@angular/core';
import {CdkMenuModule} from '@angular/cdk/menu';
import {DIALOG_DATA, DialogModule, DialogRef} from '@angular/cdk/dialog';
import { OverlayModule } from '@angular/cdk/overlay';

import { TransactionFormComponent } from '../../../modules/transactions/components/transaction-form/transaction-form.component';
import { faArrowLeft, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLinkWithHref } from '@angular/router';
import { TransactionDetail } from '@models/transaction-detail.model';
import { OverlayService } from '@services/overlay.service';
import { ExpenseService } from '@services/expense.service';
import { IncomeService } from '@services/income.service';
import { TransferService } from '@services/transfer.service';
import { CommonModule, Location } from '@angular/common';
import { RequestStatus } from '@models/request-status.model';
import { DateFilterService } from '@services/date-filter.service';
import { TransactionService } from '@services/transaction.service';
@Component({
  selector: 'app-dialog-new-register',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule, 
    TransactionFormComponent, 
    FontAwesomeModule, 
    RouterLinkWithHref, 
    OverlayModule,
    CdkMenuModule
  ],
  templateUrl: './dialog-transaction.component.html',
  styleUrl: './dialog-transaction.component.scss'
})
export class DialogTransactionComponent {
  faArrowLeft = faArrowLeft;
  faEllipsisVertical = faEllipsisVertical;
  transactionDetail!: TransactionDetail;
  status: RequestStatus = 'init';

  constructor(
    private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) data: TransactionDetail,
    private overlayService: OverlayService,
    private expenseService: ExpenseService,
    private incomeService: IncomeService,
    private transferService: TransferService,
    private location: Location,
    private dateFilterService: DateFilterService,
    private transactionService: TransactionService,

  ) {
    this.transactionDetail = data;
  }

  close() {
    this.dialogRef.close();
    this.overlayService.closeOverlayFloatingMenu();
  }

  onCloseDialog() {
    this.close();
  }

  deleteTransaction(service: any) {
    if (this.transactionDetail.id && this.transactionDetail.type) {
      service.delete(this.transactionDetail.id).subscribe({
        next: () => {
          this.status = 'success';
          this.updateTransactionData()
          this.close();
        },
        error: (error: any) => {
          this.status = 'failed';
          console.log(error);
        },
      });
    }
  }

  private updateTransactionData() {
    const currentUrl = this.location.path();
    if (currentUrl === '/transactions') {
      this.transactionService
        .getAll(this.dateFilterService.currentDateFormatted$.value,
          this.dateFilterService.nextDateFormatted$.value)
        .subscribe();
    }
  }

  deleteRegister() {
    switch (this.transactionDetail.type) {
      case 'expense':
        this.deleteTransaction(this.expenseService);
        break;
      case 'income':
        this.deleteTransaction(this.incomeService);
        break;
      case 'transfer':
        this.deleteTransaction(this.transferService);
        break;
      default:
        break;
    }
  }
}