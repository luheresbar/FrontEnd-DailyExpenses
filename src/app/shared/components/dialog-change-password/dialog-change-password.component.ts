import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ChangePasswordFormComponent } from '../../../modules/user-profile/components/change-password-form/change-password-form.component';
import {
  faArrowLeft,
  faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { UserEmail } from '@models/user.model';

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
  email!: UserEmail;

  constructor(
    private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) data: UserEmail,

  ) {
    this.email = data;
  }

  close() {
    this.dialogRef.close();
  }

  onCloseDialog() {
    this.close();
  }


}
