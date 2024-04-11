import { CommonModule, Location } from '@angular/common';
import { Component, HostListener } from '@angular/core';

import { LogoComponent } from '../../../../shared/components/atoms/logo/logo.component';
import { AvatarComponent } from '../../../../shared/components/atoms/avatar/avatar.component';
import { SearchInputComponent } from '../../../../shared/components/atoms/search-input/search-input.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBell,
  faClose,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FooterAuthComponent } from '../../../auth/components/footer/footer.component';
import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';
import { UserResponse } from '@models/user.model';
import {
  NavigationEnd,
  Router,
  RouterLinkActive,
  RouterLinkWithHref,
} from '@angular/router';
import { filter } from 'rxjs';
import { OverlayModule } from '@angular/cdk/overlay';
import { DialogUserProfileComponent } from '../../../user-profile/components/dialog-user-profile/dialog-user-profile.component';
import { Dialog } from '@angular/cdk/dialog';
import { DialogChangePasswordComponent } from '../../../user-profile/components/dialog-change-password/dialog-change-password.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    LogoComponent,
    AvatarComponent,
    SearchInputComponent,
    FontAwesomeModule,
    FooterAuthComponent,
    RouterLinkWithHref,
    RouterLinkActive,
    OverlayModule,
    DialogUserProfileComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  faBell = faBell;
  faClose = faClose;
  faInfoCircle = faInfoCircle;

  user$: UserResponse | null = null;
  activeButton: string = 'transactions';
  showAditionalContent: boolean = true;
  isCategoriesActive: boolean = false;
  isOpenOverlayMenu = false;

  constructor(
    private usersService: UserService,
    private location: Location,
    private dialog: Dialog,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.usersService.user$.subscribe((user) => (this.user$ = user));

    this.checkCurrentUrl();

    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        this.checkCurrentUrl();
      });
  }

  setActiveButton(button: string) {
    this.activeButton = button;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.showAditionalContent = (event.target as Window).innerWidth > 768;
  }

  checkCurrentUrl() {
    const currentUrl = this.location.path();
    this.isCategoriesActive = currentUrl.startsWith('/categories');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  openDialogUserProfile() {
    this.dialog.open(DialogUserProfileComponent, {
      width: 'auto',
      autoFocus: false,
      data: {
        userId: this.user$?.userId,
        username: this.user$?.username,
        email: this.user$?.email,
      },
    });
  }
  openDialogChangePassword() {
    this.dialog.open(DialogChangePasswordComponent, {
      width: 'auto',
      autoFocus: false,
      data: {
        email: this.user$?.email,
      },
    });
  }

  goToBack() {
    this.location.back();
  }
}
