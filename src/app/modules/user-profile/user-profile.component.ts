import { Component } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { AvatarComponent } from '@shared/components/atoms/avatar/avatar.component';
import { BtnComponent } from '@shared/components/atoms/btn/btn.component';
import { HorizontalLineComponent } from '@shared/components/atoms/horizontal-line/horizontal-line.component';
import { Router, RouterLinkWithHref } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { UserResponse } from '@models/user.model';
import { UserService } from '@services/user.service';


@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [BtnComponent, AvatarComponent, HorizontalLineComponent, FontAwesomeModule, RouterLinkWithHref],
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
    private usersService: UserService
  ) {}
  
  ngOnInit() {
    this.usersService.user$.subscribe((user) => (this.user$ = user));
  }
  
  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login'])
  }



}
