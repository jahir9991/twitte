import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page.component';
import { HomeRoutes } from './home.routing';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from 'src/app/@shared/shared.module';
import { TweetPostComponent } from './components/tweet-post/tweet-post.component';

@NgModule({
  declarations: [HomePageComponent, TweetPostComponent],
  imports: [CommonModule, SharedModule, HomeRoutes, HttpClientModule,],
  providers: [],
})
export class HomeModule {}
