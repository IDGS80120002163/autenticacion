import { Component, inject } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  newPassword!: string;
  currentPassword!:string;
  authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);
  route = inject(ActivatedRoute);

  changePassword(){
    this.authService.changePassword({
      email: this.authService.getUserDetail()?.email,
      newPassword: this.newPassword,
      currentPassword: this.currentPassword,
    }).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.matSnackBar.open(response.message, 'Close', {
            duration: 5000,
          });
          this.authService.logout();
          this.router.navigate(['/login']);
        } else {
          this.matSnackBar.open(response.message, 'Close', {
            duration: 5000,
          })
        }
      },
      error: (error: HttpErrorResponse) => {
        this.matSnackBar.open(error.message, 'Close', {
          duration: 5000,
        })
      }
    })
  }
}
