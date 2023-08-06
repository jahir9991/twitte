import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Subject,
  catchError,
  combineLatest,
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

enum statusEnum {
  INIT,
  LOADING,
  LOADED,
  NODATA,
  ERROR
}

@Injectable()
export class UserFollowerPageFacade {
  statusEnum = statusEnum;

  currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  currentSize$: BehaviorSubject<number> = new BehaviorSubject<number>(20);
  status$ = new BehaviorSubject<statusEnum>(statusEnum.INIT);
  hasMore$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(private tweetApiService: TweetApiService) {}

 

  currentPageData$ = combineLatest([this.currentPage$, this.currentSize$]).pipe(
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


}
