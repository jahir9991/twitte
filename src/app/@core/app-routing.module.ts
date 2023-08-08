import { NgModule } from '@angular/core';
import {
  DetachedRouteHandle,
  RouteReuseStrategy,
  RouterModule,
  Routes,
} from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { SigninGuard } from './guards/signin.guard';
import { AuthGuard } from './guards/auth.guard';
import { LogoutPageComponent } from './logout-page/logout-page.component';

const routes: Routes = [
  {
    path: 'logout',
    canActivate: [AuthGuard],

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
    loadChildren: () =>
      import('./layout/layout.module').then((m) => m.LayoutModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      // onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
