import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, catchError, combineLatest, map, of, scan, switchMap, tap } from 'rxjs';
import { FollowingResponseModel } from 'src/app/@models/followingResponse.model';
import { TweetApiService } from 'src/app/@services/api/tweet-api.service';

@Component({
  templateUrl: './user-following-page.component.html',
  styleUrls: ['./user-following-page.component.scss']
})
export class UserFollowingPageComponent {
  constructor(private tweetApiService: TweetApiService
  ) { }


  currentPage$ = new BehaviorSubject<number>(1);
  currentSize$ = new BehaviorSubject<number>(10);
  loading$ = new BehaviorSubject(false);
  hasMore$ = new BehaviorSubject(true);

  followingsData$ = combineLatest([this.currentPage$, this.currentSize$]).pipe(
    switchMap(([currentPage, currentSize]) =>
      this.tweetApiService.getUserFollowing(currentPage, currentSize)
    ),
    catchError((err) => of([])),
    tap((data: FollowingResponseModel) => {
      this.hasMore$.next(data.count == this.currentSize$.value);
    }),
    map((data: FollowingResponseModel) => data.followings),
    scan(
      (acc, data) => (this.currentPage$.value === 1 ? data : [...acc, ...data]),
      []
    )
  );

  loadMore() {
    if (!this.hasMore$.value) return;

    this.currentPage$.next(this.currentPage$.value + 1);
  }

  identify = (index: number, item: any) => item;
}
