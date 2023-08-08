import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserCardComponent } from './components/user-card/user-card.component';
import { TweetPostComponent } from './components/tweet-post/tweet-post.component';
import { TweetCardComponent } from './components/tweet-card/tweet-card.componet';
import { TimeagoModule } from 'ngx-timeago';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { RouterModule } from '@angular/router';
import { FullLoadingComponent } from './components/full-loading/full-loading.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserCardComponent,
    TweetPostComponent,
    TweetCardComponent,
    FullLoadingComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    TimeagoModule,
    InfiniteScrollModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  exports: [
    UserCardComponent,
    TweetPostComponent,
    TweetCardComponent,
    FullLoadingComponent,
    InfiniteScrollModule,
  ],
})
export class SharedModule {}
