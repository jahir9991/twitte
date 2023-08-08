import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';
import { TweetPostPayloadModel } from 'src/app/@models/tweetPayload';
import { TweetApiService } from 'src/app/@services/api/tweet-api.service';
import { ApiStatusEnum } from 'src/app/@shared/consts/ApiStatus.enum';

@UntilDestroy()
@Injectable()
export class TweetPostFacade {
  apiStatus$: BehaviorSubject<ApiStatusEnum> =
    new BehaviorSubject<ApiStatusEnum>(ApiStatusEnum.INIT);

  constructor(
    private tweetApiService: TweetApiService,
    private toastService: HotToastService,
    private router: Router
  ) {}

  tweetPost(validateForm: FormGroup, onsuccess?: Function, onError?: Function) {
    this.apiStatus$.next(ApiStatusEnum.LOADING);
    this.tweetApiService
      .tweetPost(validateForm.value as TweetPostPayloadModel)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res: any) => {
          this.toastService.success('Your tweet successfully posted');
          this.apiStatus$.next(ApiStatusEnum.LOADED);
          onsuccess();
        },
        error: () => {
          this.apiStatus$.next(ApiStatusEnum.ERROR);
        },
      });
  }
}
