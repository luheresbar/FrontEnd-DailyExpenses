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
import { AccountFormComponent } from '../../../modules/accounts/components/account-form/account-form.component';
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
  showIconfaEllipsisVertical: boolean = true;
  status: RequestStatus = 'init';

  constructor(
    private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) data: Account,
    private overlayService: OverlayService,
    private accountService: AccountService
  ) {
    this.accountDetail = data;
  }

  ngOnInit() {
    if (Object.keys(this.accountDetail).length === 0) {
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
    console.log(this.accountDetail);

    if (
      this.accountDetail !== null &&
      this.accountDetail.accountName !== null
    ) {
      const accountPK: AccountPK = {
        userId: this.accountDetail.userId,
        accountName: this.accountDetail.accountName,
      };
      this.accountService.deleteAccount(accountPK).subscribe();
    }
  }

  disableAccount() {
    const accountDto: UpdateAccountDto = {
      userId: this.accountDetail.userId,
      accountName: this.accountDetail.accountName,
      newAccountName: this.accountDetail.accountName,
      availableMoney: this.accountDetail.availableMoney,
      available: false,
    };
    console.log(accountDto); //TODO (Eliminar linea)
    this.accountService.updateAccount(accountDto).subscribe({
      next: () => {
        this.status = 'success';
        // this.closeFormDialog();
      },
      error: (error) => {
        this.status = 'failed';
        console.log(error);
      },
    });
  }

  enableAccount() {
    const accountDto: UpdateAccountDto = {
      userId: this.accountDetail.userId,
      accountName: this.accountDetail.accountName,
      newAccountName: this.accountDetail.accountName,
      availableMoney: this.accountDetail.availableMoney,
      available: true,
    };
    console.log(accountDto); //TODO (Eliminar linea)
    this.accountService.updateAccount(accountDto).subscribe({
      next: () => {
        this.status = 'success';
        // this.closeFormDialog();
      },
      error: (error) => {
        this.status = 'failed';
        console.log(error);
      },
    });
  }
}
