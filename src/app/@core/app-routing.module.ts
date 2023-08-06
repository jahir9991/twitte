import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { SigninGuard } from './guards/signin.guard';
import { AuthGuard } from './guards/auth.guard';
import { LogoutPageComponent } from './logout-page/logout-page.component';

const routes: Routes = [
  {
    path: 'logout',
    component: LogoutPageComponent,
  },

  {
    path: 'auth',
    canActivate: [SigninGuard],
    loadChildren: () =>
      import('../@features/auth/auth.module').then((m) => m.AuthModule),
    title: 'auth...',
  },

  {
    path: '',
    canActivate: [AuthGuard],
    component: LayoutComponent,
    children: [
      {
        path: 'home',

        loadChildren: () =>
          import('../@features/home/home.module').then((m) => m.HomeModule),
        title: 'this is home ...',
      },
      {
        path: 'explore',
        loadChildren: () =>
          import('../@features/explore/explore.module').then(
            (m) => m.ExploreModule
          ),
        title: 'this is home ...',
      },
      {
        path: 'profile',

        loadChildren: () =>
          import('../@features/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
        title: 'this is profile ...',
      },
      {
        path: '**',
        redirectTo: 'home',
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
