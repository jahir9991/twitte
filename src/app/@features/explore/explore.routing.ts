import { RouterModule, Routes } from '@angular/router';
import { ExplorePageComponent } from './pages/explore-page/explore-page.component';

const routes: Routes = [
  {
    path: '',
    component: ExplorePageComponent,
  },
];

export const ExploreRoutes = RouterModule.forChild(routes);
