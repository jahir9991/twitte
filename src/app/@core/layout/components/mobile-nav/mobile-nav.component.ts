import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/@services/auth.service';
import { LocalStorageService } from 'src/app/@services/local-storage.service';

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileNavComponent implements OnInit {
  isAsideNav = false;

  user;

  toggleAsideNav() {
    this.isAsideNav = !this.isAsideNav;
  }

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
  }
}
