import { Component, inject } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  authService = inject(AuthService);
  user$ = this.authService.getAll();
}
