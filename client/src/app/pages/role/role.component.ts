import { Component, inject, Input } from '@angular/core';
import { RoleFormComponent } from "../role-form/role-form.component";
import { RoleService } from '../../service/role.service';
import { RoleCreateRequest } from '../../interfaces/role-create-request';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { RoleListComponent } from '../../components/role-list/role-list.component';
import { AsyncPipe } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [
    RoleFormComponent, 
    RoleListComponent, 
    AsyncPipe,
    MatSelectModule,
    MatInput
  ],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent {
  roleService = inject(RoleService);
  authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar);
  @Input() errorMessage: string = '';
  role: RoleCreateRequest = {} as RoleCreateRequest;
  roles$ = this.roleService.getRoles();
  users$ = this.authService.getAll();

  selectedUser:string = '';
  selectedRole:string = '';

  createRole(role: RoleCreateRequest) {
    this.roleService.createRole(role).subscribe({
      next: (response: { message: string }) => {
        this.matSnackBar.open('Role Created Successfully', 'Ok', {
          duration: 3000
        });
      },
      error: (error: HttpErrorResponse) => {
        if (error.status == 400) {
          this.errorMessage = error.error;
        }
      }
    })
  }

  deleteRole(id:string){
    this.roleService.delete(id).subscribe({
      next: (response) => {
        this.roles$ = this.roleService.getRoles();
        this.matSnackBar.open('Role Deleted Success', 'Close', {
          duration: 3000,
        });
      },
      error: (error: HttpErrorResponse) => {
        this.matSnackBar.open(error.message, 'Close', {
          duration: 3000,
        });
      }
    })
  }

  assignRole(){
    this.roleService.assignRole(this.selectedUser, this.selectedRole).subscribe({
      next: (response) => {
        this.roles$ = this.roleService.getRoles();
        this.matSnackBar.open('Role Deleted Success', 'Close', {
          duration: 3000,
        });
      },
      error: (error: HttpErrorResponse) => {
        this.matSnackBar.open(error.message, 'Close', {
          duration: 3000,
        });
      }
    })
  }
}
