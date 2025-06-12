import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../../auth/services/auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const { data: { session } } = await authService.getSession();

  if (!session) {
    await router.navigate(['/login']);
    return false;
  }

  return true;
};
