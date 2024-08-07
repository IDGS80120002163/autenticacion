import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { LoginRequest } from '../interfaces/login-request';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthResponse } from '../interfaces/auth-response';
import { jwtDecode } from 'jwt-decode';
import { RegisterRequest } from '../interfaces/register-request';
import { UserDetail } from '../interfaces/user-details';
import { ResetPasswordRequest } from '../interfaces/reset-password-request';
import { ChangePasswordRequest } from '../interfaces/change-password';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string = environment.apiUrl;
  private tokenKey = 'token';

  constructor(private _http: HttpClient) {}

  login(data: LoginRequest): Observable<AuthResponse> {
    return this._http
      .post<AuthResponse>(`${this.apiUrl}/account/login`, data)
      .pipe(
        map((response) => {
          if (response.isSuccess) {
            localStorage.setItem('token', response.token);
          }
          return response;
        })
      );
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this._http
      .post<AuthResponse>(`${this.apiUrl}/account/register`, data)
      .pipe(
        map((response) => {
          if (response.isSuccess) {
            localStorage.setItem(this.tokenKey, response.token);
          }
          return response;
        })
      );
  }

  getDetail(): Observable<UserDetail> {
    return this._http.get<UserDetail>(`${this.apiUrl}/Account/detail`);
  }

  forgotPassword = (email: string): Observable<AuthResponse> =>
    this._http.post<AuthResponse>(`${this.apiUrl}/Account/forgot-password`, {
      email,
    });

  resetPassword = (data: ResetPasswordRequest): Observable<AuthResponse> =>
    this._http.post<AuthResponse>(`${this.apiUrl}/Account/reset-password`, data);

  changePassword = (data: ChangePasswordRequest): Observable<AuthResponse> =>
    this._http.post<AuthResponse>(`${this.apiUrl}/Account/change-password`, data);

  getUserDetail = () => {
    const token = this.getToken();
    if (!token) return null;
    const decodedToken: any = jwtDecode(token);
    const userDetail = {
      id: decodedToken.nameid,
      fullName: decodedToken.name,
      email: decodedToken.email,
      roles: decodedToken.role || [],
    };
    return userDetail;
  }

  isLoggedIn = (): boolean => {
    const token = this.getToken();
    if (!token) return false;

    return !this.isTokenExpired();
  }

  private isTokenExpired() {
    const token = this.getToken();
    if (!token) return true;
    const decoded = jwtDecode(token);
    const isTokenExpired = Date.now() > decoded['exp']! * 1000;
    if (isTokenExpired) this.logout();
    return isTokenExpired;
  }

  logout = (): void => {
    localStorage.removeItem(this.tokenKey);
  }

  getToken = (): string | null => localStorage.getItem(this.tokenKey) || '';

  getAll = (): Observable<UserDetail[]> =>
    this._http.get<UserDetail[]>(`${this.apiUrl}/Account`)

  getRoles = (): string[] | null => {
    const token = this.getToken();
    if (!token) return null;

    const decodedToken: any = jwtDecode(token);
    return decodedToken.role || null;
  }
}
