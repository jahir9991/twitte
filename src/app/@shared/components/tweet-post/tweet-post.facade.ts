import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';
import { TweetPostPayloadModel } from 'src/app/@models/tweetPayload';
import { TweetApiService } from 'src/app/@services/api/tweet-api.service';

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
export class TweetPostFacade {
  statusEnum = statusEnum;
  status$: BehaviorSubject<statusEnum> = new BehaviorSubject<statusEnum>(
    statusEnum.INIT
  );

  constructor(
    private tweetApiService: TweetApiService,
    private router: Router
  ) { }

  tweetPost(value: TweetPostPayloadModel) {
    console.log('ff');
    this.status$.next(statusEnum.LOADING);

    this.tweetApiService
      .tweetPost(value)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res: any) => {
          console.log(res);

          this.status$.next(statusEnum.LOADED);
        },
        error: () => {
          this.status$.next(statusEnum.ERROR);
        },
      });
  }
}
