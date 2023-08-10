import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Subject,
  catchError,
  combineLatest,
  concatMap,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  of,
  pluck,
  scan,
  switchMap,
  tap,
} from 'rxjs';
import { UserApiService } from 'src/app/@services/api/user-api.service';
import { UserSearchResponseModel } from 'src/app/@models/userSearchResponse.model';
import { TweetApiService } from 'src/app/@services/api/tweet-api.service';
import { FollowerResponseModel } from 'src/app/@models/followerResponse.model';
import { FollowingResponseModel } from 'src/app/@models/followingResponse.model';
import { ApiStatusEnum } from 'src/app/@shared/consts/ApiStatus.enum';
import { TweetResponseModel } from 'src/app/@models/tweetResponse.model';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class UserTweetsPageFacade {
  currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  currentSize$: BehaviorSubject<number> = new BehaviorSubject<number>(20);
  apiStatus$: BehaviorSubject<ApiStatusEnum> =
    new BehaviorSubject<ApiStatusEnum>(ApiStatusEnum.INIT);
  hasMore$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  userId: string;

  constructor(
    private route: ActivatedRoute,
    private tweetApiService: TweetApiService
  ) {
    this.userId = this.route.snapshot.paramMap.get('id');
  }

  currentPageData$ = combineLatest([this.currentPage$, this.currentSize$]).pipe(
    tap(() => this.apiStatus$.next(ApiStatusEnum.LOADING)),
    switchMap(([currentPage, currentSize]) =>
      this.tweetApiService.getTweetsByUserId(
        this.userId,
        currentPage,
        currentSize
      )
    ),
    catchError((err) => of([])),
    tap((data: TweetResponseModel) => {
      this.hasMore$.next(data.count == this.currentSize$.value);
      this.apiStatus$.next(ApiStatusEnum.LOADED);
    }),
    map((data: TweetResponseModel) => data.tweets),
    scan(
      (acc, data) => (this.currentPage$.value === 1 ? data : [...acc, ...data]),
      []
    ),
    tap(() => this.apiStatus$.next(ApiStatusEnum.LOADED))
  );
}
