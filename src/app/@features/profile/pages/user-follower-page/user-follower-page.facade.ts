import { Injectable } from '@angular/core';
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
import { TweetApiService } from 'src/app/@services/api/tweet-api.service';
import { FollowerResponseModel } from 'src/app/@models/followerResponse.model';
import { ApiStatusEnum } from 'src/app/@shared/consts/ApiStatus.enum';
import { ActivatedRoute } from '@angular/router';

enum statusEnum {
  INIT,
  LOADING,
  LOADED,
  NODATA,
  ERROR,
}

@Injectable()
export class UserFollowerPageFacade {
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
    this.userId = this.route.parent.snapshot.paramMap.get('id');
  }

  currentPageData$ = combineLatest([this.currentPage$, this.currentSize$]).pipe(
    tap(() => this.apiStatus$.next(ApiStatusEnum.LOADING)),
    switchMap(([currentPage, currentSize]) =>
      this.tweetApiService.getFollowersByUserId(
        this.userId,
        currentPage,
        currentSize
      )
    ),
    catchError((err) => of([])),
    tap((data: FollowerResponseModel) => {
      this.hasMore$.next(data.count == this.currentSize$.value);
      this.apiStatus$.next(ApiStatusEnum.LOADED);
    }),
    map((data: FollowerResponseModel) => data.followers),
    scan(
      (acc, data) => (this.currentPage$.value === 1 ? data : [...acc, ...data]),
      []
    ),
    tap(() => this.apiStatus$.next(ApiStatusEnum.LOADED))
  );
}
