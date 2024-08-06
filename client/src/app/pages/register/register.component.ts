import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { RoleService } from '../../service/role.service';
import { Observable } from 'rxjs';
import { Role } from '../../interfaces/role';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidationErrors } from '../../interfaces/validation-errors';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterLink,
    AsyncPipe,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  roleService = inject(RoleService);
  authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar);
  roles$!: Observable<Role[]>;
  fb = inject(FormBuilder);
  registerForm!: FormGroup;
  router = inject(Router);
  confirmPasswordHide = true;
  passwordHide = true;
  errors!:ValidationErrors[];

  register() {
    this.authService.register(this.registerForm.value).subscribe({
      next:(response)=>{
        console.log(response);

        this.matSnackBar.open(response.message, 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
        });
        this.router.navigate(['/login']);
      },
      error: (err: HttpErrorResponse) => {
        if (err!.status == 400){
          this.errors = err!.error;
          this.matSnackBar.open('Validators error', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
          })
        }
      },
      complete: () => console.log("Register success"),
    });
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      roles: [''],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: this.passwordMatchValidator,
    });

    this.roles$ = this.roleService.getRoles();
  }

  private passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }
}
