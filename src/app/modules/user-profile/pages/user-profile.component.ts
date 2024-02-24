import { Component } from '@angular/core';
import { DialogModule, Dialog } from '@angular/cdk/dialog';


import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { AvatarComponent } from '@shared/components/atoms/avatar/avatar.component';
import { BtnComponent } from '@shared/components/atoms/btn/btn.component';
import { HorizontalLineComponent } from '@shared/components/atoms/horizontal-line/horizontal-line.component';
import { Router, RouterLinkWithHref } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { UserResponse } from '@models/user.model';
import { UserService } from '@services/user.service';
import { DialogUserProfileComponent } from '@shared/components/dialog-user-profile/dialog-user-profile.component';
import { DialogChangePasswordComponent } from '@shared/components/dialog-change-password/dialog-change-password.component';


@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    BtnComponent, 
    AvatarComponent, 
    HorizontalLineComponent, 
    FontAwesomeModule, 
    RouterLinkWithHref, 
    DialogModule,
    DialogUserProfileComponent
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {

  user$: UserResponse | null = null;

  faArrowLeft = faArrowLeft;
  faPenToSquare = faPenToSquare;

  constructor (
    private authService: AuthService,
    private router: Router,
    private usersService: UserService,
    private dialog: Dialog, 

  ) {}
  
  ngOnInit() {
    this.usersService.user$.subscribe((user) => (this.user$ = user));
  }
  
  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login'])
  }

  openDialogUserProfile() {
    this.dialog.open(DialogUserProfileComponent, {
      minWidth: '300px',
      width: '100%',
      height: '100vh',
      autoFocus: false,
      data: {
        userId: this.user$?.userId,
        username: this.user$?.username,
        email: this.user$?.email
      },
    });
  }
  openDialogChangePassword() {
    this.dialog.open(DialogChangePasswordComponent, {
      minWidth: '300px',
      width: '100%',
      height: '100vh',
      autoFocus: false,
      data: {
        email: this.user$?.email
      },
    });
  }

}
