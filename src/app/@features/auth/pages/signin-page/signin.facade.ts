import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, catchError, map, of, switchMap, tap } from 'rxjs';
import { SigninPayloadModel } from 'src/app/@models/signinPayload.model';
import { SigninResponseModel } from 'src/app/@models/signinResponse.model';
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
export class SigninFacade {
  statusEnum = statusEnum;
  status$: BehaviorSubject<statusEnum> = new BehaviorSubject<statusEnum>(
    statusEnum.INIT
  );

  constructor(
    private authApiService: AuthApiService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  signIn(value: SigninPayloadModel) {
    console.log('ff');
    this.status$.next(statusEnum.LOADING);

    this.authApiService
      .signin(value)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res: any) => {
          console.log(res);

          this.localStorageService.setToken(res.token);

          this.status$.next(statusEnum.LOADED);
          this.router.navigate(['/home']);
        },
        error: () => {
          this.status$.next(statusEnum.ERROR);
        },
      });

 
  }
}
