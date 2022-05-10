import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  constructor(private http: HttpClient, private router: Router) {
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
        map((response: any) => {
          this._isLoggedIn.next(true);
          localStorage.setItem('accessToken', response.accessToken);
          return response;
        })
      );
  }

  signupWithUsernamePassword(username: any, password: any) {
    return this.http.post('/api/auth/sign-up', { username, password }).pipe(
      map((response: any) => {
        this._isLoggedIn.next(true);
        localStorage.setItem('accessToken', response.accessToken);
        return response;
      })
    );
  }
}
