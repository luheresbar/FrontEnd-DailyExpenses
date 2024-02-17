import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

import { LogoComponent } from '../../../../shared/components/atoms/logo/logo.component';
import { AvatarComponent } from '../../../../shared/components/atoms/avatar/avatar.component';
import { SearchInputComponent } from '../../../../shared/components/atoms/search-input/search-input.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell, faL } from '@fortawesome/free-solid-svg-icons';
import { FooterComponent } from '../../../auth/components/footer/footer.component';
import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';
import { UserResponse } from '@models/user.model';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    LogoComponent,
    AvatarComponent,
    SearchInputComponent,
    FontAwesomeModule,
    FooterComponent,
    RouterLinkWithHref,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  user$: UserResponse | null = null;

  activeButton: string = 'transactions';
  faBell = faBell;
  showAditionalContent: boolean = true;

  constructor(
    private authService: AuthService,
    private usersService: UserService
  ) {}

  ngOnInit() {
    this.usersService.user$.subscribe((user) => (this.user$ = user));
  }

  setActiveButton(button: string) {
    this.activeButton = button;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.showAditionalContent = (event.target as Window).innerWidth > 768;
  }
}
