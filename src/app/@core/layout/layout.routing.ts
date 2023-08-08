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
          title: 'this is home ...',
        },
        {
          path: 'explore',
          loadChildren: () =>
            import('../../@features/explore/explore.module').then(
              (m) => m.ExploreModule
            ),
          title: 'this is home ...',
        },
        {
          path: ':id',
          loadChildren: () =>
            import('../../@features/profile/profile.module').then(
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
  
  export const LayoutRoutes = RouterModule.forChild(routes);
  