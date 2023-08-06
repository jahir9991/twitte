import { Component } from '@angular/core';
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
import { FollowingResponseModel } from 'src/app/@models/followingResponse.model';
import { TweetApiService } from 'src/app/@services/api/tweet-api.service';
import { UserFollowingPageFacade } from './user-following-page.facade';

@Component({
  templateUrl: './user-following-page.component.html',
  styleUrls: ['./user-following-page.component.scss'],
  providers: [UserFollowingPageFacade],
})
export class UserFollowingPageComponent {
  constructor(private userFollowingPageFacade: UserFollowingPageFacade) {}

  currentPageData$ = this.userFollowingPageFacade.currentPageData$;
  currentPage$ = this.userFollowingPageFacade.currentPage$;
  currentSize$ = this.userFollowingPageFacade.currentSize$;
  loading$ = this.userFollowingPageFacade.status$;
  hasMore$ = this.userFollowingPageFacade.hasMore$;

  statusEnum = this.userFollowingPageFacade.statusEnum;

  loadMore() {
    if (!this.hasMore$.value) return;

    this.currentPage$.next(this.currentPage$.value + 1);
  }

  identify = (index: number, item: any) => item;
}
