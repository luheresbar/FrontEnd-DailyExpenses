import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { CdkMenuModule } from '@angular/cdk/menu';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowLeft,
  faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons';
import { Account, AccountPK, UpdateAccountDto } from '@models/account.model';
import { RequestStatus } from '@models/request-status.model';
import { AccountService } from '@services/account.service';
import { OverlayService } from '@services/overlay.service';
import { UserProfileFormComponent } from '../../../modules/user-profile/components/user-profile-form/user-profile-form.component';

@Component({
  selector: 'app-dialog-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    CdkMenuModule,
    UserProfileFormComponent,
    

  ],
  templateUrl: './dialog-user-profile.component.html',
  styleUrl: './dialog-user-profile.component.scss'
})
export class DialogUserProfileComponent {

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
      this.accountService.deleteAccount(accountPK).subscribe({
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
    this.accountService.updateAccount(accountDto).subscribe({
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