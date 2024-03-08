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
import { Account, AccountPK, UpdateAccountDto } from '@models/account.model';
import { AccountService } from '@services/account.service';
import { OverlayService } from '@services/overlay.service';
import { AccountFormComponent } from '../account-form/account-form.component';
import { RequestStatus } from '@models/request-status.model';

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
  showIconfaEllipsisVertical = true;
  status: RequestStatus = 'init';

  constructor(
    private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) data: Account,
    private overlayService: OverlayService,
    private accountService: AccountService
  ) {
    this.accountDetail = data;
    if (!Object.keys(this.accountDetail).length) {
      this.showIconfaEllipsisVertical = false;
    }
  }

  close() {
    this.dialogRef.close();
    this.overlayService.closeOverlayFloatingMenu();
  }

  onCloseDialog() {
    this.close();
  }

  deleteAccount() {
    if (this.accountDetail && this.accountDetail.accountName) {
      const accountPK: AccountPK = {
        userId: this.accountDetail.userId,
        accountName: this.accountDetail.accountName,
      };
      this.accountService.delete(accountPK).subscribe({
        next: () => {
          this.status = 'success';
          this.close()
        },
        error: (error) => {
          this.status = 'failed';
          console.log(error);
        },
      });
    }
  }

  updateAccountAvailability(available: boolean) {
    const accountDto: UpdateAccountDto = {
      userId: this.accountDetail.userId,
      accountName: this.accountDetail.accountName,
      newAccountName: this.accountDetail.accountName,
      availableMoney: this.accountDetail.availableMoney,
      available,
    };
    this.accountService.update(accountDto).subscribe({
      next: () => {
        this.status = 'success';
        this.close()
      },
      error: (error) => {
        this.status = 'failed';
        console.log(error);
      },
    });
  }
}