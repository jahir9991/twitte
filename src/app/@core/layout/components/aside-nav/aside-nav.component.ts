import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from 'src/app/@services/auth.service';
import { LocalStorageService } from 'src/app/@services/local-storage.service';

@Component({
  selector: 'app-aside-nav',
  templateUrl: './aside-nav.component.html',
  styleUrls: ['./aside-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsideNavComponent {
  constructor(private authService: AuthService) {}
  user: any;
  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
  }

  showAvatarMenu = false;
  toggleAvatarMenu() {
    this.showAvatarMenu = !this.showAvatarMenu;
  }
}
