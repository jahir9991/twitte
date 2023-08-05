import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/@services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class SigninGuard implements CanActivate {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    console.log('signin called',this.localStorageService.isAuthenticated());
    
    if (this.localStorageService.isAuthenticated()) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
