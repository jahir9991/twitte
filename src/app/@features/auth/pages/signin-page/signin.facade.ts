import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, catchError, map, of, switchMap, tap } from 'rxjs';
import { SigninPayloadModel } from 'src/app/@models/signinPayload.model';
import { SigninResponseModel } from 'src/app/@models/signinResponse.model';
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
    private router: Router
  ) {}

  signIn(value: SigninPayloadModel) {
    this.status$.next(ApiStatusEnum.LOADING);

    this.authApiService
      .signin(value)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res: any) => {
          console.log(res);

          this.localStorageService.setToken(res.token);

          this.status$.next(ApiStatusEnum.LOADED);
          this.router.navigate(['/home']);
        },
        error: () => {
          this.status$.next(ApiStatusEnum.ERROR);
        },
      })
      .add(() => console.log('signin done'));
  }
}
