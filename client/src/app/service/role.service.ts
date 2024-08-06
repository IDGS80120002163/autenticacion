import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../interfaces/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  apiUrl = environment.apiUrl;

  constructor(private https:HttpClient) { }

  getRoles = () : Observable<Role[]>=>
    this.https.get<Role[]>(`${this.apiUrl}/Roles`)
}
