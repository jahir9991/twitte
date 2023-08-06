import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SigninFacade } from './signin.facade';
import { SigninPayloadModel } from 'src/app/@models/signinPayload.model';
import { ENV } from 'src/environments/environment';

@Component({
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.scss'],
  providers: [SigninFacade],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class SigninPageComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private modelfacade: SigninFacade
  ) {}

  status$ = this.modelfacade.status$;
  statusEnum = this.modelfacade.statusEnum;

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      email: [ENV.INIT_AUTH.email, [Validators.required, Validators.email]],
      password: [ENV.INIT_AUTH.password, [Validators.required]],
    });
  }

  get signinPayload(): SigninPayloadModel {
    const formValue = this.validateForm?.value;
    return {
      email: formValue?.email,
      password: formValue?.password,
    } as SigninPayloadModel;
  }

  makeformdirty() {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsTouched();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
  }

  onSubmit(): void {
    this.makeformdirty();
    if (this.validateForm.invalid) return;
    this.modelfacade.signIn(this.validateForm.value);
  }
}
