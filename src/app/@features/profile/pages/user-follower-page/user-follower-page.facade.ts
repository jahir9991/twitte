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
import { FollowerResponseModel } from 'src/app/@models/followerResponse.model';
import { ApiStatusEnum } from 'src/app/@shared/consts/ApiStatus.enum';
import { ActivatedRoute } from '@angular/router';
import { UserApiService } from 'src/app/@services/api/user-api.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UserEntity } from 'src/app/@entities/user.entity';
import { HotToastService } from '@ngneat/hot-toast';

@UntilDestroy()
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
    private userApiService: UserApiService,
    private toastService: HotToastService
  ) {
    this.userId = this.route.parent.snapshot.paramMap.get('id');
  }

  currentPageData$ = combineLatest([this.currentPage$, this.currentSize$]).pipe(
    tap(() => this.apiStatus$.next(ApiStatusEnum.LOADING)),
    switchMap(([currentPage, currentSize]) =>
      this.userApiService.getFollowersByUserId(
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
