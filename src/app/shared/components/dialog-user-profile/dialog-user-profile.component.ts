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
import { UserService } from '@services/user.service';
import { privateDecrypt } from 'crypto';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';

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
    private userService: UserService,
    private authService: AuthService,
    private router: Router,

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
    if (this.userDetail.userId) {
      this.userService.delete().subscribe({
        next: () => {
          this.status = 'success';
          this.authService.logout();
          this.router.navigate(['/auth/login']);
          this.close()
        },
        error: (error) => {
          this.status = 'failed';
          console.log(error);
        },
      });
    }
  }

}