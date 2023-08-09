import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { TimeagoModule } from 'ngx-timeago';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SigninGuard } from './guards/signin.guard';
import { AuthGuard } from './guards/auth.guard';
import { LogoutPageComponent } from './logout-page/logout-page.component';
import { RouteReuseStrategy } from '@angular/router';
import { CustomRouteReuseStrategy } from './rouerStrategy';
import { HotToastModule } from '@ngneat/hot-toast';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [AppComponent, LogoutPageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    TimeagoModule.forRoot(),
    HotToastModule.forRoot({
      position: 'top-right',
      className: 'toast-glass',
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: CustomRouteReuseStrategy,
    },
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
