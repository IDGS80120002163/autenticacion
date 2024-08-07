import { Component, inject, OnInit } from '@angular/core';
import { ResetPasswordRequest } from '../../interfaces/reset-password-request';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  resetPassword= {} as ResetPasswordRequest
  authService = inject(AuthService);
  snackBar = inject(MatSnackBar);
  router = inject(Router);
  route = inject(ActivatedRoute)

  ngOnInit(): void {
      this.route.queryParams.subscribe((params)=>{
        this.resetPassword.email = params["email"];
        this.resetPassword.token = params["token"];
      })
  }

  ressetPassword(){
    this.authService.resetPassword(this.resetPassword).subscribe({
      next: (response) => {
        this.snackBar.open(response.message, 'Close', {
          duration: 5000,
        });
        this.router.navigate(['/login']);
      },
      error: (error: HttpErrorResponse) => {
        this.snackBar.open(error.error.message, 'Close', {
          duration:5000,
        })
      }
    })
  }
}
