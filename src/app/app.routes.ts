import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/pages/login/login.component';
import { RegisterComponent } from './modules/auth/pages/register/register.component';
import { RecoveryComponent } from './modules/auth/pages/recovery/recovery.component';
import { ForgotPasswordComponent } from './modules/auth/pages/forgot-password/forgot-password.component';
import { TransactionSummaryComponent } from './modules/transactions/pages/transaction-summary/transaction-summary.component';
import { LayoutMainComponent } from './modules/layout/layout-main/layout-main.component';
import { authGuard } from '@guards/auth.guard';
import { redirectGuard } from '@guards/redirect.guard';
import { UserProfileComponent } from './modules/user-profile/user-profile.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutMainComponent,
    children: [
      {
        path: 'transactions',
        canActivate: [ authGuard ],
        component: TransactionSummaryComponent,
      },
    ],
  },
  {
    path: 'user-profile',
    canActivate: [ authGuard ],
    component: UserProfileComponent,
  },
  {
    path: 'auth/login',
    canActivate: [redirectGuard], // TODO (Por medio de programacion modular configurar paths)
    component: LoginComponent,
  },
  {
    path: 'auth/register',
    canActivate: [ redirectGuard ],
    component: RegisterComponent,
  },
  {
    path: 'auth/recovery',
    canActivate: [ redirectGuard ],
    component: RecoveryComponent,
  },
  {
    path: 'auth/forgot-password',
    canActivate: [ redirectGuard ],
    component: ForgotPasswordComponent,
  },
];
