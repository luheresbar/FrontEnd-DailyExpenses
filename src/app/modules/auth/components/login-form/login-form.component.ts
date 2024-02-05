import { Component } from '@angular/core';

import { BtnComponent } from '../../../../shared/components/atoms/btn/btn.component';
import { CommonModule } from '@angular/common';
import { faPen, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, BtnComponent, FontAwesomeModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {

  faEye = faEye;
  faEyeSlash = faEyeSlash;

  showPassword = false;


}
