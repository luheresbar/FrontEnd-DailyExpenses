import { Component, Input, Output, signal } from '@angular/core';
import {DialogModule, Dialog} from '@angular/cdk/dialog';

import { BtnComponent } from '../atoms/btn/btn.component';
import { DialogTransactionComponent } from '../dialog-transaction/dialog-transaction.component';
import { OverlayService } from '@services/overlay.service';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { DialogAccountComponent } from '../dialog-account/dialog-account.component';

@Component({
  selector: 'app-floating-menu',
  standalone: true,
  imports: [CommonModule, BtnComponent, DialogModule, DialogTransactionComponent, OverlayModule],
  templateUrl: './floating-menu.component.html',
  styleUrl: './floating-menu.component.scss'
})
export class FloatingMenuComponent {

  @Input() typeFloatingMenu: string = '';

  transactionType = '';

  constructor(
    private dialog: Dialog,
    private overlayService: OverlayService,
  ) {}

  openDialogTransaction() {
    this.dialog.open(DialogTransactionComponent, {
      minWidth: '300px',
      width: '100%',
      height: '100vh',
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

  openDialogAccount() {
    this.dialog.open(DialogAccountComponent, {
      minWidth: '300px',
      width: '100%',
      height: '100vh',
      autoFocus: false,
      data: {},
    });
  }

  assingTransactionType(type: string) {
    this.transactionType = type;
  }



  // closeOverlay() {
  //   this.overlayService.closeOverlayFloatingMenu();
  // }


}


