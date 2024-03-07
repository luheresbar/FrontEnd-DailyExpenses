import { Routes } from '@angular/router';
import { exitGuard } from '@guards/exit.guard';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component'),
  },
  {
    path: 'register',
    // canDeactivate:ch [ exitGuard ], //TODO(CanDeactive)
    loadComponent: () => import('./pages/register/register.component'),
  },
  {
    path: 'recovery',
    loadComponent: () => import('./pages/recovery/recovery.component'),
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./pages/forgot-password/forgot-password.component'),
  },
];
