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
import { UpdateUserDto, UserProfile } from '@models/user.model';

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
  userDetail!: UpdateUserDto;
  status: RequestStatus = 'init';

  constructor(
    private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) data: UpdateUserDto,
    private overlayService: OverlayService,
    private accountService: AccountService
  ) {
    this.userDetail = data;
  }

  close() {
    this.dialogRef.close();
    this.overlayService.closeOverlayFloatingMenu();
  }

  onCloseDialog() {
    this.close();
  }

  deleteUserProfile() {
    // if (this.accountDetail && this.accountDetail.accountName) {
    //   const accountPK: AccountPK = {
    //     userId: this.accountDetail.userId,
    //     accountName: this.accountDetail.accountName,
    //   };
    //   this.accountService.deleteAccount(accountPK).subscribe({
    //     next: () => {
    //       this.status = 'success';
    //       this.close()
    //     },
    //     error: (error) => {
    //       this.status = 'failed';
    //       console.log(error);
    //     },
    //   });
    // }
  }

}