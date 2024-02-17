import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faEye, faEyeSlash, faL } from '@fortawesome/free-solid-svg-icons';
import { HorizontalLineComponent } from '@shared/components/atoms/horizontal-line/horizontal-line.component';

@Component({
  selector: 'app-account-detail',
  standalone: true,
  imports: [
    CommonModule,
    HorizontalLineComponent,
    FontAwesomeModule
  ],
  templateUrl: './account-detail.component.html',
  styleUrl: './account-detail.component.scss'
})
export class AccountDetailComponent {

  showAmount: boolean = false;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  // @Input() accounts!: TransactionDetail;
  // faArrowRight = faArrowRight;
  formattedTransactionDate: string | null = '';

  constructor(
    // private dialog: Dialog,

    ) {
  }
  
  // ngOnInit() {
  //   this.formatDate();
  // }

  // getTransactionTypeClass(): string {
  //   switch (this.transaction.type) {
  //     case 'income':
  //       return 'income';
  //     case 'expense':
  //       return 'expense';
  //     case 'transfer':
  //       return 'transfer';
  //     default:
  //       return '';
  //   }
  // }

  // openDialogViewTransaction() {
  //   this.dialog.open(DialogNewRegisterComponent, {
  //     minWidth: '300px',
  //     width: '100%',
  //     height: '100vh',
  //     autoFocus: false,
  //     data: {
  //       type: this.transaction.type,
  //       id: this.transaction.id,
  //       description: this.transaction.description,
  //       date: this.transaction.date,
  //       amount: this.transaction.amount,
  //       category: this.transaction.category,
  //       sourceAccountName: this.transaction.sourceAccountName,
  //       destinationAccountName: this.transaction.destinationAccountName,
  //     },
  //   });
  // }

  // formatDate() {
  //   if (this.transaction.date != null) {

  //     const dateReceived: string = this.transaction.date;
  //     const date: Date = new Date(dateReceived);

  //     this.formattedTransactionDate = new DatePipe('en-US').transform(
  //       date,'EEE, dd'
  //     );
  //   }
  // }

}
