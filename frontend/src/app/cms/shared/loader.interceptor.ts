import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CmsService } from '../services/cms.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];
  constructor(private cmsService: CmsService) {}

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this.cmsService.loading$.next(this.requests.length > 0);
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.requests.push(request);

    this.cmsService.loading$.next(true);
    return Observable.create(
      (observer: {
        next: (arg0: HttpEvent<any>) => void;
        error: (arg0: any) => void;
        complete: () => void;
      }) => {
        const subscription = next.handle(request).subscribe(
          (event) => {
            if (event instanceof HttpResponse) {
              this.removeRequest(request);
              observer.next(event);
            }
          },
          (err) => {
            this.removeRequest(request);
            observer.error(err);
          },
          () => {
            this.removeRequest(request);
            observer.complete();
          }
        );
        // remove request from queue when cancelled
        return () => {
          this.removeRequest(request);
          subscription.unsubscribe();
        };
      }
    );
  }
}
