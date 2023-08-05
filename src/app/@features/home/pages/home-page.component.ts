import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(
    private tweetApiService: TweetApiService,
    private authApiService: AuthApiService
  ) {}
  ngOnInit(): void {}

  currentPage$ = new BehaviorSubject<number>(1);
  currentSize$ = new BehaviorSubject<number>(10);
  loading$ = new BehaviorSubject(false);
  hasMore$ = new BehaviorSubject(true);

  currentPageData$ = combineLatest([this.currentPage$, this.currentSize$]).pipe(
    switchMap(([currentPage, currentSize]) =>
      this.tweetApiService.getTimeline(currentPage, currentSize)
    ),
    catchError((err) => of([])),
    tap((data: TimelineResponseModel) => {
      this.hasMore$.next(data.count == this.currentSize$.value);
    }),
    map((data: TimelineResponseModel) => data.timeline),
    scan(
      (acc, data) => (this.currentPage$.value === 1 ? data : [...acc, ...data]),
      []
    )
  );

  loadMore() {
    console.log('scroll');

    if (!this.hasMore$.value) return;

    this.currentPage$.next(this.currentPage$.value + 1);
  }

  identify = (index: number, item: any) => item;
}
