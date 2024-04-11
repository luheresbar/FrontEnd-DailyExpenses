import { Component, Input, Output, signal } from '@angular/core';
import { DialogModule, Dialog } from '@angular/cdk/dialog';

import { BtnComponent } from '../atoms/btn/btn.component';
import { DialogTransactionComponent } from '../../../modules/transactions/components/dialog-transaction/dialog-transaction.component';
import { OverlayService } from '@services/overlay.service';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { DialogAccountComponent } from '../../../modules/accounts/components/dialog-account/dialog-account.component';
import { DialogCategoryComponent } from '../../../modules/categories/components/dialog-category/dialog-category.component';

@Component({
  selector: 'app-floating-menu',
  standalone: true,
  imports: [
    CommonModule,
    BtnComponent,
    DialogModule,
    DialogTransactionComponent,
    OverlayModule,
  ],
  templateUrl: './floating-menu.component.html',
  styleUrl: './floating-menu.component.scss',
})
export class FloatingMenuComponent {
  @Input() typeFloatingMenu: string = '';

  transactionType = '';
  accountType = '';
  

  constructor(
    private dialog: Dialog, 
    private overlayService: OverlayService,
    ) {}

  openDialogTransaction() {
    this.dialog.open(DialogTransactionComponent, {
      width: 'auto',
      autoFocus: false,
      data: {
        type: this.transactionType,
        id: null,
        description: '',
        date: '',
        amount: 0,
        category: '',
        sourceAccountName: '',
        destinationAccountName: '',
      },
    });
  }

  assingTransactionType(type: string) {
    this.transactionType = type;
  }

  openDialogAccount() {
    this.dialog.open(DialogAccountComponent, {
      width: 'auto',
      autoFocus: false,
      data: {},
    });
  }

  openDialogCategory() {
    this.dialog.open(DialogCategoryComponent, {
      width: 'auto',
      autoFocus: false,
      data: {
        categoryType: this.accountType,
        categoryName: '',
        userId: null,
      },
    });
  }

  assingCategoryType(type: string) {
    this.accountType = type;
  }

  closeOverlay() {
    this.overlayService.closeOverlayFloatingMenu();
  }
}
