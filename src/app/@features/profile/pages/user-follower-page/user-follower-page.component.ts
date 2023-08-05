import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, catchError, combineLatest, map, of, scan, switchMap, tap } from 'rxjs';
import { FollowerResponseModel } from 'src/app/@models/followerResponse.model';
import { TweetApiService } from 'src/app/@services/api/tweet-api.service';

@Component({
  templateUrl: './user-follower-page.component.html',
  styleUrls: ['./user-follower-page.component.scss']
})
export class UserFollowerPageComponent {
  constructor(private tweetApiService: TweetApiService
  ) { }


  currentPage$ = new BehaviorSubject<number>(1);
  currentSize$ = new BehaviorSubject<number>(10);
  loading$ = new BehaviorSubject(false);
  hasMore$ = new BehaviorSubject(true);

  followersData$ = combineLatest([this.currentPage$, this.currentSize$]).pipe(
    switchMap(([currentPage, currentSize]) =>
      this.tweetApiService.getUserFollowers(currentPage, currentSize)
    ),
    catchError((err) => of([])),
    tap((data: FollowerResponseModel) => {
      this.hasMore$.next(data.count == this.currentSize$.value);
    }),
    map((data: FollowerResponseModel) => data.followers),
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
