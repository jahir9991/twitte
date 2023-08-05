import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutes } from './profile-routing';
import { ProfileBasePageComponent } from './base-page/profile-base-page.component';
import { UserTweetsPageComponent } from './pages/user-tweets-page/user-tweets-page.component';
import { UserFollowingPageComponent } from './pages/user-following-page/user-following-page.component';
import { SharedModule } from 'src/app/@shared/shared.module';
import { UserFollowerPageComponent } from './pages/user-follower-page/user-follower-page.component';

@NgModule({
  declarations: [
    ProfileBasePageComponent,
    UserTweetsPageComponent,
    UserFollowingPageComponent,
    UserFollowerPageComponent
  ],
  imports: [CommonModule, ProfileRoutes, SharedModule],
  
})
export class ProfileModule { }
