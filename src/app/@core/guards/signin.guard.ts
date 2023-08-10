import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/@services/auth.service';
import { LocalStorageService } from 'src/app/@services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class SigninGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/home'], { replaceUrl: true });
      return false;
    }
    return true;
  }
}
