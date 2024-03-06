import { Component } from '@angular/core';

import { AuthContainerComponent } from '../../components/auth-container/auth-container.component';
import { CommonModule } from '@angular/common';
import { ForgotPasswordFormComponent } from '../../components/forgot-password-form/forgot-password-form.component';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, AuthContainerComponent, ForgotPasswordFormComponent, RouterLinkWithHref],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export default class ForgotPasswordComponent {

  showSocialMedia: boolean = false;

}
