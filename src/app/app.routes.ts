import { Routes } from '@angular/router';
import { LayoutMainComponent } from './modules/layout/layout-main/layout-main.component';
import { authGuard } from '@guards/auth.guard';
import { redirectGuard } from '@guards/redirect.guard';
import { adminGuard } from '@guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/transactions',
    pathMatch: 'full'
  },
  {
    path: '',
    component: LayoutMainComponent,
    children: [
      {
        path: 'transactions',
        canActivate: [ authGuard ],
        loadComponent: () => import('./modules/transactions/pages/transaction-summary/transaction-summary.component').then(m => m.TransactionSummaryComponent)
      },
      {
        path: 'transactions/expenses',
        canActivate: [ authGuard ],
        loadComponent: () => import('./modules/transactions/pages/expense-summary/expense-summary.component')
      },
      {
        path: 'transactions/incomes',
        canActivate: [ authGuard ],
        loadComponent: () => import('./modules/transactions/pages/income-summary/income-summary.component')
      },
      {
        path: 'transactions/transfers',
        canActivate: [ authGuard ],
        loadComponent: () => import('./modules/transactions/pages/transfer-summary/transfer-summary.component')
      },
      {
        path: 'accounts',
        canActivate: [ authGuard ],
        loadComponent: () => import('./modules/accounts/pages/account-summary/account-summary.component')
      },
      {
        path: 'categories/expenses',
        canActivate: [ authGuard ],
        loadComponent: () => import('./modules/categories/pages/expense-category-summary/expense-category-summary.component')
      },
      {
        path: 'categories/incomes',
        canActivate: [ authGuard ],
        loadComponent: () => import('./modules/categories/pages/income-category-summary/income-category-summary.component')
      },
    ],
  },
  {
    path: 'user-profile',
    canActivate: [ authGuard ],
    loadComponent: () => import('./modules/user-profile/pages/user-profile.component')
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.routes').then(m => m.AUTH_ROUTES),
    canActivate: [redirectGuard],
  }

];