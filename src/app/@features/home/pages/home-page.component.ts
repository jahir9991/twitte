import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
import { AuthApiService } from 'src/app/@services/api/auth-api.service';
import { TweetApiService } from 'src/app/@services/api/tweet-api.service';
import { HomePageFacade } from './home-page.facade';
import { ApiStatusEnum } from 'src/app/@shared/consts/ApiStatus.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HomePageFacade],
})
export class HomePageComponent {
  constructor(private modalFacade: HomePageFacade) {}

  ApiStatusEnum = ApiStatusEnum;

  currentPageData$ = this.modalFacade.currentPageData$;

  currentPage$ = this.modalFacade.currentPage$;
  currentSize$ = this.modalFacade.currentSize$;
  apiStatus$ = this.modalFacade.apiStatus$;
  hasMore$ = this.modalFacade.hasMore$;

  loadMore() {
    this.currentPage$.next(this.currentPage$.value + 1);
  }

  identify = (index: number, item: any) => item;
}
