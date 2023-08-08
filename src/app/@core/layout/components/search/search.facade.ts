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
  mergeMap,
  of,
  pluck,
  switchMap,
  tap,
} from 'rxjs';
import { UserApiService } from 'src/app/@services/api/user-api.service';
import { UserSearchResponseModel } from 'src/app/@models/userSearchResponse.model';
import { UserEntity } from 'src/app/@entities/user.entity';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { HotToastService } from '@ngneat/hot-toast';

enum statusEnum {
  INIT,
  LOADING,
  LOADED,
  NODATA,
  ERROR,
  MIN_LENGTH,
}

@UntilDestroy()
@Injectable()
export class SearchFacade {
  statusEnum = statusEnum;

  currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  currentSize$: BehaviorSubject<number> = new BehaviorSubject<number>(20);
  status$ = new BehaviorSubject<statusEnum>(statusEnum.INIT);
  hasMore$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  searchTerm$: Subject<string> = new Subject<string>();

  constructor(
    private userApiService: UserApiService,
    private toastService: HotToastService
  ) {}

  currentPageData$ = combineLatest([
    this.currentPage$,
    this.currentSize$,
    this.searchTerm$,
  ]).pipe(
    tap(() => this.status$.next(statusEnum.LOADING)),
    debounceTime(500),
    distinctUntilChanged(),
    switchMap(([currentPage, currentSize, searchTerm]) =>
      this.userApiService.getUsersBySearch(currentPage, currentSize, searchTerm)
    ),
    catchError((err) => {
      console.log('mm', err);
      this.status$.next(statusEnum.ERROR);
      return of<UserSearchResponseModel>({ count: 0, search_results: [] });
    }),
    tap((data: UserSearchResponseModel) => {
      console.log(data.count == 0);
      if (data.count == 0) {
        this.status$.next(statusEnum.NODATA);
      } else {
        this.status$.next(statusEnum.LOADED);
      }
    }),
    map((data: UserSearchResponseModel) => data.search_results)
  );

  followUser(user: UserEntity) {
    this.userApiService
      .followUser(user.id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (data) => {
          this.toastService.success(data.resp);
        },
      });
  }

  unfollowUser(user: UserEntity) {
    this.userApiService
      .unfollowUser(user.id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (data) => {
          this.toastService.info(data.resp);
        },
      });
  }
}
