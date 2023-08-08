import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, catchError, map, of, switchMap, tap } from 'rxjs';
import { SigninPayloadModel } from 'src/app/@models/signinPayload.model';
import { SignupPayloadModel } from 'src/app/@models/signupPayload.model';
import { SignupResponseModel } from 'src/app/@models/signupResponse.model';
import { AuthApiService } from 'src/app/@services/api/auth-api.service';
import { LocalStorageService } from 'src/app/@services/local-storage.service';

 enum apiStatusEnum {
  INIT,
  LOADING,
  LOADED,
  NODATA,
  ERROR,
}

@UntilDestroy()
@Injectable()
export class SignupFacade {
  apiStatusEnum = apiStatusEnum;
  status$: BehaviorSubject<apiStatusEnum> = new BehaviorSubject<apiStatusEnum>(
    apiStatusEnum.INIT
  );

  constructor(
    private authApiService: AuthApiService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  signup(value: SignupPayloadModel) {
    this.status$.next(apiStatusEnum.LOADING);

    this.authApiService
      .signup(value)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res: SignupResponseModel) => {
        
          if (res.message === 'successful') {
            this.router.navigate(['/auth/signin']);
          } else {
            this.status$.next(apiStatusEnum.ERROR);
          }
        },
        error: () => {
          this.status$.next(apiStatusEnum.ERROR);
        },
      });
  }
}
