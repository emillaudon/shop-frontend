import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../data-access/auth.service';

export const guestGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const token = auth.getTokenSnapshot();

  if (token && !auth.isTokenExpired(token)) {
    return router.createUrlTree(['/']);
  }

  return true;
};
