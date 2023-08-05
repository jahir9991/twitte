import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { TimeagoModule } from 'ngx-timeago';
import { LayoutComponent } from './layout/layout.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AsideNavComponent } from './layout/components/aside-nav/aside-nav.component';
import { MobileNavComponent } from './layout/components/mobile-nav/mobile-nav.component';
import { SigninGuard } from './guards/signin.guard';
import { AuthGuard } from './guards/auth.guard';
import { LogoutPageComponent } from './logout-page/logout-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    AsideNavComponent,
    MobileNavComponent,
    LogoutPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    TimeagoModule.forRoot(),
  ],
  providers: [
    [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
      },
    ],
    SigninGuard,
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
