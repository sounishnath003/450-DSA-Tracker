import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { CmsService } from '../services/cms.service';

@Injectable({
  providedIn: 'root',
})
export class CmsAuthGuard implements CanActivate {
  constructor(private router: Router, private cmsService: CmsService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.cmsService.authState$.pipe(
      take(1),
      map((value) => {
        if (!value) {
          this.router.navigate(['', 'cms', 'auth']);
        }
        return value;
      })
    );
  }
}
