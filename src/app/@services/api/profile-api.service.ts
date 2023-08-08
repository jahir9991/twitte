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
export class ProfileApiService {
  private readonly END_POINT = ENV.API_ENDPOINT;
  constructor(
    private http: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  getMyTimeline(page: number, size: number): Observable<any> {
    return this.http.get(this.END_POINT + `timeline?page=${page}&size=${size}`);
  }

  getMyFollowers(page: number, size: number): Observable<any> {
    return this.http.get(
      this.END_POINT + `followers?page=${page}&size=${size}`
    );
  }
  getMyFollowings(page: number, size: number): Observable<any> {
    return this.http.get(
      this.END_POINT + `followings?page=${page}&size=${size}`
    );
  }
}
