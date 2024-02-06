import { Component } from '@angular/core';

import { AuthContainerComponent } from '../../components/auth-container/auth-container.component';
import { CommonModule } from '@angular/common';
import { ForgotPasswordFormComponent } from '../../components/forgot-password-form/forgot-password-form.component';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, AuthContainerComponent, ForgotPasswordFormComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  showSocialMedia: boolean = false;
  showAuthLoginregister: boolean = false;

}
