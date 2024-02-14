import { Component, Inject } from '@angular/core';

import {DIALOG_DATA, DialogModule, DialogRef} from '@angular/cdk/dialog';
import { TransactionFormComponent } from '../../../modules/transactions/components/transaction-form/transaction-form.component';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLinkWithHref } from '@angular/router';
import { TransactionDetail } from '@models/transaction-detail.model';


@Component({
  selector: 'app-dialog-new-register',
  standalone: true,
  imports: [DialogModule, TransactionFormComponent, FontAwesomeModule, RouterLinkWithHref],
  templateUrl: './dialog-new-register.component.html',
  styleUrl: './dialog-new-register.component.scss'
})
export class DialogNewRegisterComponent {

  faArrowLeft = faArrowLeft;
  transactionDetail!: TransactionDetail;

  constructor(
    private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) data:TransactionDetail,
    ) {
      this.transactionDetail = data
    }
    close() {
      this.dialogRef.close();
    }
}
