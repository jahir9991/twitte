import { RouterModule, Routes } from '@angular/router';
import { AuthBasePageComponent } from './base-page/auth-base-page.component';
import { SigninPageComponent } from './pages/signin-page/signin-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';

const routes: Routes = [
  {
    path: '',
    component: AuthBasePageComponent,
    children: [
      {
        path: 'signin',
        component: SigninPageComponent,
      },
      {
        path: 'signup',
        component: SignupPageComponent,
      },
    
    ],
  },
];

export const AuthRoutes = RouterModule.forChild(routes);
