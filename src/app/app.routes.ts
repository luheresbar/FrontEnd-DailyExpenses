import { Routes } from '@angular/router';
import { LayoutMainComponent } from './modules/layout/layout-main/layout-main.component';
import { authGuard } from '@guards/auth.guard';
import { redirectGuard } from '@guards/redirect.guard';

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
        loadComponent: () => import('./modules/transactions/pages/transaction-summary/transaction-summary.component').then(m => m.TransactionSummaryComponent),
        data: { preload : true }
      },
      {
        path: 'transactions/expenses',
        canActivate: [ authGuard ],
        loadComponent: () => import('./modules/transactions/pages/expense-summary/expense-summary.component'),
        data: { preload : true }
      },
      {
        path: 'transactions/incomes',
        canActivate: [ authGuard ],
        loadComponent: () => import('./modules/transactions/pages/income-summary/income-summary.component'),
        data: { preload : true }
      },
      {
        path: 'transactions/transfers',
        canActivate: [ authGuard ],
        loadComponent: () => import('./modules/transactions/pages/transfer-summary/transfer-summary.component'),
        data: { preload : true }
      },
      {
        path: 'accounts',
        canActivate: [ authGuard ],
        loadComponent: () => import('./modules/accounts/pages/account-summary/account-summary.component'),
        data: { preload : true }
      },
      {
        path: 'categories/expenses',
        canActivate: [ authGuard ],
        loadComponent: () => import('./modules/categories/pages/expense-category-summary/expense-category-summary.component'),
        data: { preload : true }
      },
      {
        path: 'categories/incomes',
        canActivate: [ authGuard ],
        loadComponent: () => import('./modules/categories/pages/income-category-summary/income-category-summary.component'),
        data: { preload : true }
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
    canActivate: [redirectGuard],
    loadChildren: () => import('./modules/auth/auth.routes').then(m => m.AUTH_ROUTES),
  }

];