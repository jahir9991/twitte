import { RouterModule, Routes } from '@angular/router';
import { ProfileBasePageComponent } from './base-page/profile-base-page.component';
import { UserTweetsPageComponent } from './pages/user-tweets-page/user-tweets-page.component';
import { UserFollowingPageComponent } from './pages/user-following-page/user-following-page.component';
import { UserFollowerPageComponent } from './pages/user-follower-page/user-follower-page.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileBasePageComponent,

    children: [
      {
        path: '',
        component: UserTweetsPageComponent,
        // data: {
        //   shouldCached: true
        // },
      },
      {
        path: 'following',
        component: UserFollowingPageComponent,
      },
      {
        path: 'followers',
        component: UserFollowerPageComponent,
      },
    ],
  },
];

export const ProfileRoutes = RouterModule.forChild(routes);
