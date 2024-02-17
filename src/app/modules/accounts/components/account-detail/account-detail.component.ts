import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faEye, faEyeSlash, faL } from '@fortawesome/free-solid-svg-icons';
import { Account } from '@models/account.model';
import { ShowAmountService } from '@services/show-amount.service';
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

  @Input() accountDetail!: Account;
  showAmount$: boolean = false;

  faEye = faEye;
  faEyeSlash = faEyeSlash;


  constructor(
    // private dialog: Dialog,
    private showAmountServise: ShowAmountService,

    ) {
  }

  ngOnInit() {
    this.showAmountServise.isAmountVisible$.subscribe(value => {
      this.showAmount$ = value;
    })
  }

  changeVisibilityStatus() {
    this.showAmountServise.changeVisibilityStatus();
  }

  getTransactionTypeClass(): string {
    if (this.accountDetail.available) {
        return 'enabled';
      } else {
        return 'disabled';
    }
  }


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

}
