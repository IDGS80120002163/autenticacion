import { CanActivateFn } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const matSnackBar = inject(MatSnackBar);

  if(inject(AuthService).isLoggedIn()){
    return true;
  }

  matSnackBar.open('You must be logged in to view this page', 'Ok', {
    duration: 3000,
  });
  return false;
};
