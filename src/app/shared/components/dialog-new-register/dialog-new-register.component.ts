import { Component } from '@angular/core';

import {DialogModule, DialogRef} from '@angular/cdk/dialog';
import { TransactionFormComponent } from '../../../modules/transactions/components/transaction-form/transaction-form.component';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-dialog-new-register',
  standalone: true,
  imports: [DialogModule, TransactionFormComponent, FontAwesomeModule],
  templateUrl: './dialog-new-register.component.html',
  styleUrl: './dialog-new-register.component.scss'
})
export class DialogNewRegisterComponent {

  faArrowLeft = faArrowLeft;

  constructor(
    private dialogRef: DialogRef
    ) {}

    close() {
      this.dialogRef.close();
    }
}
