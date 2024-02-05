import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';

import { AuthContainerComponent } from '../../components/auth-container/auth-container.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    LoginFormComponent, 
    AuthContainerComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
