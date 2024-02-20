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
import { CommonModule } from '@angular/common';
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

  constructor(
    private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) data:TransactionDetail,
    private overlayService: OverlayService,

    private expenseService: ExpenseService,
    private incomeService: IncomeService,
    private transferService: TransferService,

    ) {
      this.transactionDetail = data
    }
  
    close() {
      this.dialogRef.close();
      this.overlayService.closeOverlayFloatingMenu();
    }

    onCloseDialog() {
      this.close();
    }

    deleteRegister() {
      
      if(this.transactionDetail.id !== null && this.transactionDetail.type !== null) {
        if(this.transactionDetail.type === 'expense') {
          this.expenseService.deleteExpense(this.transactionDetail.id).subscribe();
        }
        if(this.transactionDetail.type === 'income') {
          this.incomeService.deleteIncome(this.transactionDetail.id).subscribe();
        }
        if(this.transactionDetail.type === 'transfer') {
          this.transferService.deleteTransfer(this.transactionDetail.id).subscribe();
        }
      }
    }

}
