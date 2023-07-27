import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { AuthStatus } from '../interfaces';

//Nombre para los Guards
//PublicGuard - PrivateGuard

export const isAutenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject( AuthService);
  const router = inject( Router );

  if( authService.authStatus() === AuthStatus.authenticated ){
    return true;
  }

  router.navigateByUrl('/auth/login');
  return false;
};
