import { Component } from '@angular/core';
import { BtnComponent } from '../../../../shared/components/atoms/btn/btn.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password-form',
  standalone: true,
  imports: [CommonModule, BtnComponent],
  templateUrl: './forgot-password-form.component.html',
  styleUrl: './forgot-password-form.component.scss'
})
export class ForgotPasswordFormComponent {

  emailSent = false
}
