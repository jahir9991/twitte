import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ENV } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private END_POINT = ENV.API_ENDPOINT;

  constructor(private http: HttpClient) {}

  getUsers(page: number, size: number): Observable<any> {
    return this.http.get(this.END_POINT + `users?page=${page}&size=${size}`);
  }

  getFollowingsByUserId(
    userId: string,
    page: number,
    size: number
  ): Observable<any> {
    return this.http.get(
      this.END_POINT + `users/${userId}/following?page=${page}&size=${size}`
    );
  }
  getFollowersByUserId(
    userId: string,
    page: number,
    size: number
  ): Observable<any> {
    return this.http.get(
      this.END_POINT + `users/${userId}/followers?page=${page}&size=${size}`
    );
  }

  getUsersBySearch(
    page: number,
    size: number,
    searchTerm: string
  ): Observable<any> {
    return this.http.post(this.END_POINT + `search?page=${page}&size=${size}`, {
      token: searchTerm,
    });
  }

  followUser(userId: string): Observable<any> {
    return this.http.post(this.END_POINT + `follow`, {
      user_id: userId,
    });
  }
  unfollowUser(userId: string): Observable<any> {
    return this.http.post(this.END_POINT + `unfollow`, {
      user_id: userId,
    });
  }
}
