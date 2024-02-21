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
import { ExpenseSummaryComponent } from './modules/transactions/pages/expense-summary/expense-summary.component';
import { IncomeSummaryComponent } from './modules/transactions/pages/income-summary/income-summary.component';
import { TransferSummaryComponent } from './modules/transactions/pages/transfer-summary/transfer-summary.component';
import { AccountSummaryComponent } from './modules/accounts/pages/account-summary/account-summary.component';
import { ExpenseCategorySummaryComponent } from './modules/categories/pages/expense-category-summary/expense-category-summary.component';
import { IncomeCategorySummaryComponent } from './modules/categories/pages/income-category-summary/income-category-summary.component';

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
      {
        path: 'transactions/expenses',
        canActivate: [ authGuard ],
        component: ExpenseSummaryComponent,
      },
      {
        path: 'transactions/incomes',
        canActivate: [ authGuard ],
        component: IncomeSummaryComponent,
      },
      {
        path: 'transactions/transfers',
        canActivate: [ authGuard ],
        component: TransferSummaryComponent,
      },
      {
        path: 'accounts',
        canActivate: [ authGuard ],
        component: AccountSummaryComponent,
      },
      {
        path: 'categories',
        canActivate: [ authGuard ],
        component: ExpenseCategorySummaryComponent,
      },
      {
        path: 'categories/incomes',
        canActivate: [ authGuard ],
        component: IncomeCategorySummaryComponent,
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
