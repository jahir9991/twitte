import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthBasePageComponent } from './base-page/auth-base-page.component';
import { AuthRoutes } from './auth.routing';
import { SigninPageComponent } from './pages/signin-page/signin-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomIconComponent } from 'src/app/@shared/components/custom-icon/custom-icon.component';
import { AppleAuthButtonComponent } from './components/apple-auth-button/apple-auth-button.component';
import { GoogleAuthButtonComponent } from './components/google-auth-button/google-auth-button.component';
import { SharedModule } from 'src/app/@shared/shared.module';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';

@NgModule({
  declarations: [AuthBasePageComponent, SigninPageComponent, SignupPageComponent,CustomIconComponent, AppleAuthButtonComponent, GoogleAuthButtonComponent],
  imports: [CommonModule, AuthRoutes, FormsModule, SharedModule, ReactiveFormsModule],
  providers: []
})
export class AuthModule { }
