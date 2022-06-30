import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  constructor(
    private http: HttpClient,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    this._isLoggedIn.next(!!localStorage.getItem('accessToken'));
  }

  get authState$(): Observable<boolean> {
    return this._isLoggedIn.asObservable();
  }

  signinWithUsernamePassword(username: string, password: string) {
    return this.http
      .post(
        '/api/auth/login',
        {
          username,
          password,
        },
        { withCredentials: true }
      )
      .pipe(
        catchError((err) => {
          if (typeof err.error.message != 'string') {
            for (const m of err.error.message) {
              this.snackbar.open(m, 'Error', {
                panelClass: ['bg-gray-800'],
                duration: 1000,
              });
            }
          }
          return err;
        }),
        tap((response: any) => {
          if (response.status != 201) {
            if (typeof response.message === 'string') {
              this.snackbar.open(response.message, 'Try again', {
                panelClass: ['bg-gray-800'],
                duration: 3000,
              });
            }
            return response;
          }
        }),
        map((response: any) => {
          this._isLoggedIn.next(true);
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem(
            'userInitials',
            `${username.charAt(0)}${username.charAt(1)}`.toUpperCase()
          );
          return response;
        })
      );
  }

  signupWithUsernamePassword(username: any, password: any) {
    return this.http
      .post(
        '/api/auth/signup',
        { username, password },
        { withCredentials: true }
      )
      .pipe(
        catchError((err) => {
          if (typeof err.error.message != 'string') {
            for (const m of err.error.message) {
              this.snackbar.open(m, 'Error', {
                panelClass: ['bg-gray-800'],
                duration: 1000,
              });
            }
          }
          return err;
        }),
        tap((response: any) => {
          if (response.status != 201) {
            if (typeof response.message === 'string') {
              this.snackbar.open(response.message, 'Try again', {
                panelClass: ['bg-gray-800'],
                duration: 3000,
              });
            }
            return response;
          }
        }),
        map((response: any) => {
          this._isLoggedIn.next(true);
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem(
            'userInitials',
            `${username.charAt(0)}${username.charAt(1)}`.toUpperCase()
          );
          return response;
        })
      );
  }
}
