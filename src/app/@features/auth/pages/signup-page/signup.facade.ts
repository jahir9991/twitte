import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, catchError, map, of, switchMap, tap } from 'rxjs';
import { SigninPayloadModel } from 'src/app/@models/signinPayload.model';
import { SignupPayloadModel } from 'src/app/@models/signupPayload.model';
import { SignupResponseModel } from 'src/app/@models/signupResponse.model';
import { AuthApiService } from 'src/app/@services/api/auth-api.service';
import { LocalStorageService } from 'src/app/@services/local-storage.service';

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
export class SignupFacade {
  statusEnum = statusEnum;
  status$: BehaviorSubject<statusEnum> = new BehaviorSubject<statusEnum>(
    statusEnum.INIT
  );

  constructor(
    private authApiService: AuthApiService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  signup(value: SignupPayloadModel) {
    this.status$.next(statusEnum.LOADING);

    this.authApiService
      .signup(value)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res: SignupResponseModel) => {
        

          if (res.message === 'successful') {
            this.router.navigate(['/auth/signin']);
          } else {
            this.status$.next(statusEnum.ERROR);
          }
        },
        error: () => {
          this.status$.next(statusEnum.ERROR);
        },
      });
  }
}
