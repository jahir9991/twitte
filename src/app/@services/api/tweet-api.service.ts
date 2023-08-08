import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { TweetPostPayloadModel } from 'src/app/@models/tweetPayload';
import { ENV } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TweetApiService {
  private END_POINT = ENV.API_ENDPOINT;

  constructor(private http: HttpClient) { }

  getTimeline(page: number, size: number): Observable<any> {
    return this.http.get(this.END_POINT + `timeline?page=${page}&size=${size}`);
  };

  getTweetsByUserId(userId: string, page: number, size: number): Observable<any> {
    return this.http.get(this.END_POINT + `users/${userId}/tweets?page=${page}&size=${size}`);
  };

  getFollowingsByUserId(userId:string,page: number, size: number): Observable<any> {
    return this.http.get(this.END_POINT + `users/${userId}/following?page=${page}&size=${size}`);
  };
  getFollowersByUserId(userId:string,page: number, size: number): Observable<any> {
    return this.http.get(this.END_POINT + `users/${userId}/followers?page=${page}&size=${size}`);
  };

  getUserFollowers(page: number, size: number): Observable<any> {
    return this.http.get(this.END_POINT + `followers?page=${page}&size=${size}`);
  };

  tweetPost(payload: TweetPostPayloadModel): Observable<any> {
    return this.http.post<any>(this.END_POINT + `tweet `, payload);
  }
}
