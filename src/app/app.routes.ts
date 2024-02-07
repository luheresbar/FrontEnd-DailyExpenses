import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/pages/login/login.component';
import { RegisterComponent } from './modules/auth/pages/register/register.component';
import { RecoveryComponent } from './modules/auth/pages/recovery/recovery.component';
import { ForgotPasswordComponent } from './modules/auth/pages/forgot-password/forgot-password.component';
import { TransactionSummaryComponent } from './modules/transactions/pages/transaction-summary/transaction-summary.component';
import { LayoutMainComponent } from './modules/layout/layout-main/layout-main.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutMainComponent,
    children: [
      {
        path: '',
        component: TransactionSummaryComponent
      }
    ]
  },
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
  },

];
