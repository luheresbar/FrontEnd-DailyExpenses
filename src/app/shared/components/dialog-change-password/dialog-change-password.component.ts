import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChangePasswordFormComponent } from '../../../modules/user-profile/components/change-password-form/change-password-form.component';
import {
  faArrowLeft,
  faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-dialog-change-password',
  standalone: true,
  imports: [
    CommonModule,
    ChangePasswordFormComponent,
    FontAwesomeModule
  ],
  templateUrl: './dialog-change-password.component.html',
  styleUrl: './dialog-change-password.component.scss'
})
export class DialogChangePasswordComponent {

  
  faArrowLeft = faArrowLeft;
  faEllipsisVertical = faEllipsisVertical;

  // faArrowLeft = faArrowLeft;
  // faEllipsisVertical = faEllipsisVertical;
  // userDetail!: UpdateUserDto;
  // status: RequestStatus = 'init';

  constructor(
    private dialogRef: DialogRef,

  ) {}

  close() {
    this.dialogRef.close();
  }

  onCloseDialog() {
    this.close();
  }

  // deleteUserProfile() {
  //   // if (this.accountDetail && this.accountDetail.accountName) {
  //   //   const accountPK: AccountPK = {
  //   //     userId: this.accountDetail.userId,
  //   //     accountName: this.accountDetail.accountName,
  //   //   };
  //   //   this.accountService.deleteAccount(accountPK).subscribe({
  //   //     next: () => {
  //   //       this.status = 'success';
  //   //       this.close()
  //   //     },
  //   //     error: (error) => {
  //   //       this.status = 'failed';
  //   //       console.log(error);
  //   //     },
  //   //   });
  //   // }
  // }

}
