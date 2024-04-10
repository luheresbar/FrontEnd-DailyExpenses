import { Component } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { AuthService } from '@services/auth.service';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';

import { faBell, faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [OverlayModule, FontAwesomeModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})
export class AvatarComponent {
  faClose = faClose;

  userProfileActive: boolean = false;
  isOpenOverlayMenu = false;

  constructor (
    private authService: AuthService,
    private router: Router,
    // private usersService: UserService,
    // private dialog: Dialog, 
    // private location: Location,

  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
