import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/pages/login/login.component';
import { RegisterComponent } from './modules/auth/pages/register/register.component';
import { RecoveryFormComponent } from './modules/auth/components/recovery-form/recovery-form.component';
import { RecoveryComponent } from './modules/auth/pages/recovery/recovery.component';
import { ForgotPasswordComponent } from './modules/auth/pages/forgot-password/forgot-password.component';

export const routes: Routes = [
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'auth/register',
    component: RegisterComponent
  },
  {
    path: 'auth/recovery',
    component: RecoveryComponent
  },
  {
    path: 'auth/forgot-password',
    component: ForgotPasswordComponent
  }

];
