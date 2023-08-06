import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, catchError, combineLatest, map, of, scan, switchMap, tap } from 'rxjs';
import { FollowerResponseModel } from 'src/app/@models/followerResponse.model';
import { TweetApiService } from 'src/app/@services/api/tweet-api.service';
import { UserFollowerPageFacade } from './user-follower-page.facade';

@Component({
  templateUrl: './user-follower-page.component.html',
  styleUrls: ['./user-follower-page.component.scss'],
  providers:[UserFollowerPageFacade]
})
export class UserFollowerPageComponent {
  constructor(private modelFacade: UserFollowerPageFacade
  ) { }


  currentPageData$ = this.modelFacade.currentPageData$;
  status$ = this.modelFacade.status$;
  statusEnum = this.modelFacade.statusEnum;

  currentPage$ = this.modelFacade.currentPage$;
  currentSize$ = new BehaviorSubject<number>(10);
  hasMore$ = this.modelFacade.hasMore$;


  loadMore() {
    if (!this.hasMore$.value) return;

    this.currentPage$.next(this.currentPage$.value + 1);
  }

  identify = (index: number, item: any) => item;
}
