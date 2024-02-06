import { Component } from '@angular/core';

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BtnComponent } from '../../../../shared/components/atoms/btn/btn.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, BtnComponent, FontAwesomeModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {

  faEye = faEye;
  faEyeSlash = faEyeSlash;

  showRegister = false;
  showPassword = false;


}
