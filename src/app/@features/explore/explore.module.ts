import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExplorePageComponent } from './pages/explore-page/explore-page.component';
import { ExploreRoutes } from './explore.routing';
import { SharedModule } from 'src/app/@shared/shared.module';



@NgModule({
  declarations: [
    ExplorePageComponent
  ],
  imports: [
    CommonModule,
    ExploreRoutes,
    SharedModule
  ]
})
export class ExploreModule { }
