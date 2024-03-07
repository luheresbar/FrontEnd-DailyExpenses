import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '@services/user.service';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  return userService.user$.pipe(
    map((user) => {

      if (user && user?.roles.some((role) => role.role === 'ADMIN')) {
        return true;
      } else {
        router.navigate(['/transactions']);
        return false;
      }
    })
  );
};
