import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../../service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [FormsModule, MatIcon],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  email!: string;
  authService = inject(AuthService);
  snackBar = inject(MatSnackBar);
  showEmailSent = false;
  isSubmitting = false;

  forgetPassword(){
    this.isSubmitting = true;
    this.authService.forgotPassword(this.email).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.snackBar.open(response.message, 'Close', {
            duration: 5000,
          });
          this.showEmailSent = true;
        } else {
          this.snackBar.open(response.message, 'Close', {
            duration: 5000,
          })
        }
      },
      error: (error: HttpErrorResponse) => {
        this.snackBar.open(error.message, 'Close', {
          duration: 5000,
        })
      },
      complete:()=>{
        this.isSubmitting = false;
      }
    })
  }
}
