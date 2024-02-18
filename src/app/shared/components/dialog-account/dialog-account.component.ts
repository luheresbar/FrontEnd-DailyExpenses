import { DIALOG_DATA, DialogModule, DialogRef } from '@angular/cdk/dialog';
import { CdkMenuModule } from '@angular/cdk/menu';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowLeft,
  faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons';
import { Account } from '@models/account.model';
import { AccountService } from '@services/account.service';
import { OverlayService } from '@services/overlay.service';
import { AccountFormComponent } from '../../../modules/accounts/components/account-form/account-form.component';

@Component({
  selector: 'app-dialog-account',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    FontAwesomeModule,
    RouterLinkWithHref,
    OverlayModule,
    CdkMenuModule,
    AccountFormComponent,
  ],
  templateUrl: './dialog-account.component.html',
  styleUrl: './dialog-account.component.scss',
})
export class DialogAccountComponent {
  faArrowLeft = faArrowLeft;
  faEllipsisVertical = faEllipsisVertical;
  accountDetail!: Account;

  constructor(
    private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) data: Account,
    private overlayService: OverlayService,
    private accountService: AccountService
  ) {
    this.accountDetail = data;
  }

  ngOnInit() {
    
  }

  close() {
    this.dialogRef.close();
    this.overlayService.closeOverlayFloatingMenu();
  }

  onCloseDialog() {
    this.close();
  }

  deleteRegister() {}
}
