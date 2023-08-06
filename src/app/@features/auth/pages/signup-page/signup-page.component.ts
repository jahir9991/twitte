import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupPayloadModel } from 'src/app/@models/signupPayload.model';
import { SignupFacade } from './signup.facade';
import { ENV } from 'src/environments/environment';

@Component({
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
  providers: [SignupFacade],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class SignupPageComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private modelfacade: SignupFacade
  ) {}

  status$ = this.modelfacade.status$;
  statusEnum = this.modelfacade.statusEnum;

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      email: [ENV.INIT_AUTH.email, [Validators.required, Validators.email]],
      username: [ENV.INIT_AUTH.username, [Validators.required]],
      password: [ENV.INIT_AUTH.password, [Validators.required]],

     
    });
  }

  get signinPayload(): SignupPayloadModel {
    const formValue = this.validateForm?.value;
    return {
      email: formValue?.email,
      username: formValue?.userName,
      password: formValue?.password,
    } as SignupPayloadModel;
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
    this.modelfacade.signup(this.validateForm.value as SignupPayloadModel);
  }
}
