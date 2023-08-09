import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SigninFacade } from './signin.facade';
import { makeFormDirty } from 'src/app/@shared/utils';
import { UntilDestroy } from '@ngneat/until-destroy';

import { ApiStatusEnum } from 'src/app/@shared/consts/ApiStatus.enum';
import { ENV } from 'src/environments/environment';

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
