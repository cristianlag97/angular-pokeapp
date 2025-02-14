import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import User from '../models/Users';
import { tap } from 'rxjs/operators';
import { LocalstorageService } from '../../../../core/storage/services/localstorage.service';
import { Auth, AuthLogin } from '../models/Auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public avail: boolean = false;
  public msg: string = '';

  public isAuthenticated: boolean = false;

  private readonly TOKEN_KEY = 'token_Data';
  private readonly USER_DATA_KEY = 'USER_Data';
  private readonly SESSION_EXPIRY_KEY = 'sessionExpiryData';
  private readonly SESSION_DURATION = 5 * 24 * 60 * 60 * 1000;

  apiUrlAuth: string = environment.apiUrl + '/auth';

  constructor(
    private http: HttpClient,
    private router: Router,
    private localStorage: LocalstorageService
  ) {}

  //User register methods
  createUser(user: User) {
    return this.http.post<AuthLogin>(this.apiUrlAuth + '/sign-up', user).pipe(
      tap((user) => {
        if (user.data.accessToken) {
          this.setUserSession(user.data);
        }
      })
    );
  }

  //User login methods
  loginUser(email: String, password: String) {
    return this.http
      .post<AuthLogin>(`${this.apiUrlAuth}/sign-in`, { email, password })
      .pipe(
        tap((user) => {
          if (user.data.accessToken) {
            this.setUserSession(user.data);
          }
        })
      );
  }

  // Session management methods
  private setUserSession(user: Auth): void {
    if (user.accessToken) {
      const data = {
        name: user.name,
        email: user.email,
        token: user.accessToken,
      };

      this.localStorage.setStorageSession(this.TOKEN_KEY, user.accessToken);
      this.localStorage.setStorageSession(this.USER_DATA_KEY, JSON.stringify(data));
      this.setSessionExpiry();
      this.isAuthenticated = true;
    }
  }

  private setSessionExpiry(): void {
    const expiryTime = new Date().getTime() + this.SESSION_DURATION;
    sessionStorage.setItem(this.SESSION_EXPIRY_KEY, expiryTime.toString());
  }

  getToken(): string | null {
    return (
      sessionStorage.getItem(this.TOKEN_KEY)
    );
  }

  logout(): void {
    this.localStorage.removeStorageItem(this.TOKEN_KEY);
    this.localStorage.removeStorageItem(this.USER_DATA_KEY);
    sessionStorage.removeItem(this.SESSION_EXPIRY_KEY);
    this.localStorage.clearSessionStorage();
    this.isAuthenticated = false;
    this.router.navigate(['/sign-in']);
  }
}
