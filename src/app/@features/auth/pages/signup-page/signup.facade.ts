import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject,} from 'rxjs';
import { SignupPayloadModel } from 'src/app/@models/signupPayload.model';
import { SignupResponseModel } from 'src/app/@models/signupResponse.model';
import { AuthApiService } from 'src/app/@services/api/auth-api.service';
import { LocalStorageService } from 'src/app/@services/local-storage.service';
import { ApiStatusEnum } from 'src/app/@shared/consts/ApiStatus.enum';


@UntilDestroy()
@Injectable()
export class SignupFacade {

  status$: BehaviorSubject<ApiStatusEnum> = new BehaviorSubject<ApiStatusEnum>(
    ApiStatusEnum.INIT
  );

  constructor(
    private authApiService: AuthApiService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  signup(value: SignupPayloadModel) {
    this.status$.next(ApiStatusEnum.LOADING);

    this.authApiService
      .signup(value)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res: SignupResponseModel) => {
        
          if (res.message === 'successful') {
            this.router.navigate(['/auth/signin']);
          } else {
            this.status$.next(ApiStatusEnum.ERROR);
          }
        },
        error: () => {
          this.status$.next(ApiStatusEnum.ERROR);
        },
      });
  }
}
