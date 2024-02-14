import { Component } from '@angular/core';

import {DialogModule, DialogRef} from '@angular/cdk/dialog';
import { TransactionFormComponent } from '../../../modules/transactions/components/transaction-form/transaction-form.component';

@Component({
  selector: 'app-dialog-new-register',
  standalone: true,
  imports: [DialogModule, TransactionFormComponent],
  templateUrl: './dialog-new-register.component.html',
  styleUrl: './dialog-new-register.component.scss'
})
export class DialogNewRegisterComponent {

  constructor(
    private dialogRef: DialogRef
    ) {}

    close() {
      this.dialogRef.close();
    }
}
