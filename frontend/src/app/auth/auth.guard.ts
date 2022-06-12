import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment } from '@angular/router';
import { map, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private router: Router, private authService: AuthService) {}

  canLoad(route: Route, segments: UrlSegment[]) {
    return this.authService.authState$.pipe(
      take(1),
      map((value) => {
        if (!value) {
          this.router.navigate(['', 'auth'], {
            queryParams: { redirectTo: route.path || 'dashboard' },
          });
        }
        return value;
      })
    );
  }
}
