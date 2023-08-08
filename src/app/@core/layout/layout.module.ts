import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { MobileNavComponent } from './components/mobile-nav/mobile-nav.component';
import { AsideNavComponent } from './components/aside-nav/aside-nav.component';
import { SharedModule } from 'src/app/@shared/shared.module';
import { SearchComponent } from './components/search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { LayoutRoutes } from './layout.routing';

@NgModule({
  declarations: [
    LayoutComponent,
    MobileNavComponent,
    AsideNavComponent,
    SearchComponent,
  ],
  imports: [CommonModule, SharedModule, LayoutRoutes, HttpClientModule],
})
export class LayoutModule {}
