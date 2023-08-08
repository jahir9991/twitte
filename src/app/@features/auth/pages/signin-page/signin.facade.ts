import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';
import { SigninPayloadModel } from 'src/app/@models/signinPayload.model';
import { AuthApiService } from 'src/app/@services/api/auth-api.service';
import { LocalStorageService } from 'src/app/@services/local-storage.service';
import { ApiStatusEnum } from 'src/app/@shared/consts/ApiStatus.enum';

@UntilDestroy()
@Injectable()
export class SigninFacade {
  status$: BehaviorSubject<ApiStatusEnum> = new BehaviorSubject<ApiStatusEnum>(
    ApiStatusEnum.INIT
  );

  constructor(
    private authApiService: AuthApiService,
    private localStorageService: LocalStorageService,
    private toastService: HotToastService,
    private router: Router
  ) {}

  signIn(value: SigninPayloadModel) {
    this.status$.next(ApiStatusEnum.LOADING);

    this.authApiService
      .signin(value)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res: any) => {
          this.localStorageService.setToken(res.token);
          this.toastService.success('successfully logged in');
          this.status$.next(ApiStatusEnum.LOADED);
          this.router.navigate(['/home'], { replaceUrl: false });
        },
        error: () => {
          this.toastService.error('login failed');
          this.status$.next(ApiStatusEnum.ERROR);
        },
      })
      .add(() => console.log('signin done'));
  }
}
