import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/@services/local-storage.service';
import { ENV } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.isExcludedUrl(req.url)) {
      return next.handle(req);
    }

    const isAuthenticated: any = this.localStorageService.isAuthenticated();
    console.log('isAuthenticated',isAuthenticated);
    

    if (!isAuthenticated) {
      this.router.navigate(['/logout']);
    } else {
      const accessToken: any = this.localStorageService.getToken();
      req = req.clone({
        setHeaders: {
          'X-Jwt-Token': `Bearer ${accessToken}`,
        },
      });
    }
    return next.handle(req);
  }
  private isExcludedUrl(url: string): boolean {
    return [ENV.API_ENDPOINT + 'signup', ENV.API_ENDPOINT + 'login'].some(
      (excludedUrl) => url.includes(excludedUrl)
    );
  }
}
