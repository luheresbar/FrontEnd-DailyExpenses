import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { AuthContainerComponent } from '../../components/auth-container/auth-container.component';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    LoginFormComponent, 
    AuthContainerComponent,
    RouterLinkWithHref
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent {

  @Input() routerLink: string = "";


}
