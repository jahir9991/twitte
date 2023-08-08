import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ɵconvertToBitFlags,
} from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { AuthApiService } from 'src/app/@services/api/auth-api.service';
import { LocalStorageService } from 'src/app/@services/local-storage.service';
import { NavigationService } from 'src/app/@services/navigation.service';

@Component({
  templateUrl: './logout-page.component.html',
  styleUrls: ['./logout-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoutPageComponent implements OnInit {
  constructor(
    private localstorageService: LocalStorageService,
    private navigationService: NavigationService,
    private location: Location,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    if (this.activeRoute.snapshot.queryParamMap.get('force')) {
      this.logout();
    }
  }

  gotoBack() {
    this.location.back();
  }
  logout() {
    this.localstorageService.clearAll();
    this.router.navigate(['/auth'], { replaceUrl: true });
  }
}
