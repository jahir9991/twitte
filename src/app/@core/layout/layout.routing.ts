import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
      path: '',
    //   canActivate: [AuthGuard],
      component: LayoutComponent,
      children: [
        {
          path: 'home',
          loadChildren: () =>
            import('../../@features/home/home.module').then((m) => m.HomeModule),
          title: 'Twitte: Home of your thoughts',
        },
        {
          path: 'explore',
          loadChildren: () =>
            import('../../@features/explore/explore.module').then(
              (m) => m.ExploreModule
            ),
          title: 'Explore new   ...',
        },
        {
          path: ':id',
          loadChildren: () =>
            import('../../@features/profile/profile.module').then(
              (m) => m.ProfileModule
            ),
          title: 'Profile ...',
        },
  
        {
          path: '**',
          redirectTo: 'home',
        },
      ],
    },
  ];
  
  export const LayoutRoutes = RouterModule.forChild(routes);
  