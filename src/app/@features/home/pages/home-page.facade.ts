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
import { TimelineResponseModel } from 'src/app/@models/timelineResponse.model';
import { TweetResponseModel } from 'src/app/@models/tweetResponse.model';
import { TweetApiService } from 'src/app/@services/api/tweet-api.service';
import { ApiStatusEnum } from 'src/app/@shared/consts/ApiStatus.enum';

@Injectable()
export class HomePageFacade {
  currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  currentSize$: BehaviorSubject<number> = new BehaviorSubject<number>(20);
  apiStatus$: BehaviorSubject<ApiStatusEnum> =
    new BehaviorSubject<ApiStatusEnum>(ApiStatusEnum.INIT);
  hasMore$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  userId: string;

  constructor(private tweetApiService: TweetApiService) {}

  currentPageData$ = combineLatest([this.currentPage$, this.currentSize$]).pipe(
    tap(() => this.apiStatus$.next(ApiStatusEnum.LOADING)),
    switchMap(([currentPage, currentSize]) =>
      this.tweetApiService.getTimeline(currentPage, currentSize)
    ),
    catchError((err) => of([])),
    tap((data: TimelineResponseModel) => {
      this.hasMore$.next(data.count == this.currentSize$.value);
      this.apiStatus$.next(ApiStatusEnum.LOADED);
    }),
    map((data: TimelineResponseModel) => data.timeline),
    scan(
      (acc, data) => (this.currentPage$.value === 1 ? data : [...acc, ...data]),
      []
    ),
    tap(() => this.apiStatus$.next(ApiStatusEnum.LOADED))
  );
}
