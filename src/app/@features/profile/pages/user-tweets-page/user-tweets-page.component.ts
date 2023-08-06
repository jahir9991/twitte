import { Component, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  map,
  of,
  scan,
  switchMap,
  tap,
} from 'rxjs';
import { TweetResponseModel } from 'src/app/@models/tweetResponse.model';
import { TweetApiService } from 'src/app/@services/api/tweet-api.service';

@Component({
  templateUrl: './user-tweets-page.component.html',
  styleUrls: ['./user-tweets-page.component.scss'],
})
export class UserTweetsPageComponent {
  constructor(
    private tweetApiService: TweetApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userId = parseInt(this.route.snapshot.paramMap.get('id'));
  }

  userId: number;

  currentPage$ = new BehaviorSubject<number>(1);
  currentSize$ = new BehaviorSubject<number>(10);
  loading$ = new BehaviorSubject(false);
  hasMore$ = new BehaviorSubject(true);

  currentPageData$ = combineLatest([this.currentPage$, this.currentSize$]).pipe(
    switchMap(([currentPage, currentSize]) =>
      this.tweetApiService.getUserTweets(this.userId, currentPage, currentSize)
    ),
    catchError((err) => of([])),
    tap((data: TweetResponseModel) => {
      this.hasMore$.next(data.count == this.currentSize$.value);
    }),
    map((data: TweetResponseModel) => data.tweets),
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
