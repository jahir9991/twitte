import { Injectable } from '@angular/core';
import { ENV } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SigninPayloadModel } from 'src/app/@models/signinPayload.model';
import { Router } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private readonly END_POINT = ENV.API_ENDPOINT;
  constructor(
    private http: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  signin(payload: SigninPayloadModel): Observable<any> {
    return this.http.post<any>(this.END_POINT + `login`, payload);
  }
  signup(payload: SigninPayloadModel): Observable<any> {
    return this.http.post<any>(this.END_POINT + `signup`, payload);
  }

  logout() {
    this.localStorageService.clearAll();
    this.router.navigate(['/auth']);
  }
}
