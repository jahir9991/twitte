import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SigninFacade } from './signin.facade';
import { SigninPayloadModel } from 'src/app/@models/signinPayload.model';
import { ENV } from 'src/environments/environment';
import { makeFormDirty } from 'src/app/@shared/utils';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { interval } from 'rxjs';
import { ApiStatusEnum } from 'src/app/@shared/consts/ApiStatus.enum';

@UntilDestroy()
@Component({
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.scss'],
  providers: [SigninFacade],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SigninPageComponent implements OnInit {
  validateForm!: FormGroup;
  ApiStatusEnum = ApiStatusEnum;

  constructor(
    private readonly formBuilder: FormBuilder,
    private modelfacade: SigninFacade
  ) {}

  status$ = this.modelfacade.status$;

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      email: [ENV.INIT_AUTH.email, [Validators.required, Validators.email]],
      password: [ENV.INIT_AUTH.password, [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.validateForm.invalid) {
      makeFormDirty(this.validateForm);
      return;
    }
    this.modelfacade.signIn(this.validateForm.value);
  }
}
