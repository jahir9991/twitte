import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
];

export const HomeRoutes = RouterModule.forChild(routes);
