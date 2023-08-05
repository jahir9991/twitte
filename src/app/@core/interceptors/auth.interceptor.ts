import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { AuthApiService } from 'src/app/@services/api/auth-api.service';
import { LocalStorageService } from 'src/app/@services/local-storage.service';

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
    let accessToken: any = this.localStorageService.getToken();
    if (accessToken) {
      let decodedAccessToken: any = this.localStorageService.getDecodedToken();
      let accessTokenExpired: any = this.localStorageService.isTokenExpired(
        decodedAccessToken.exp
      );

      if (!accessTokenExpired) {
        req = req.clone({
          setHeaders: {
            'X-Jwt-Token': `Bearer ${accessToken}`,
          },
        });
      } else {
        this.router.navigate(['/logout']);
        alert('token expired');
      }
    }
    return next.handle(req);
  }
}
