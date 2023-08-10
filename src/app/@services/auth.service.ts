import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private localStorageService: LocalStorageService) {}

  isAuthenticated() {
    return this.localStorageService.isTokenValid();
  }

  getCurrentUser() {
    const user = this.localStorageService.getDecodedToken();
    return user || false;
  }
}
