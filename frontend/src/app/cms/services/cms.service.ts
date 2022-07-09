import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, switchMap, tap } from 'rxjs';
import { Problem, Question } from './all-problems-interface';

@Injectable({
  providedIn: 'root',
})
export class CmsService {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  constructor(
    private http: HttpClient,
    private snackbar: MatSnackBar,
    private router: Router
  ) {
    this._isLoggedIn.next(
      !!localStorage.getItem('accessToken') &&
        !!localStorage.getItem(`isCMSAdmin`)
    );
  }

  get authState$(): Observable<boolean> {
    return this._isLoggedIn.asObservable();
  }

  updateProblemDetails(updatedProblemParams: Partial<Problem>) {
    return this.http
      .patch(
        `/api/questions/problems/update`,
        { ...updatedProblemParams },
        { params: { problemId: '' + updatedProblemParams.id } }
      )
      .pipe(switchMap(() => this.buildAndPopulateCMSDashboard$()));
  }

  buildAndPopulateCMSDashboard$(): Observable<Array<Question>> {
    return this.http
      .get(`/api/questions`)
      .pipe(map((resp: any) => resp.data.questions));
  }

  cmsLogin(username: string, password: string) {
    return this.http
      .post(
        `/api/auth/cms-login`,
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
          localStorage.setItem('isCMSAdmin', `true`);
          localStorage.setItem(
            'userInitials',
            `${username.charAt(0)}${username.charAt(1)}`.toUpperCase()
          );
          return response;
        })
      );
  }
}
