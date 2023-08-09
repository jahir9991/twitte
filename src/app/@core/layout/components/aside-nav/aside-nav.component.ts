import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LocalStorageService } from 'src/app/@services/local-storage.service';

@Component({
  selector: 'app-aside-nav',
  templateUrl: './aside-nav.component.html',
  styleUrls: ['./aside-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsideNavComponent {
  constructor(private localStoreService: LocalStorageService) {}
  user: any;
  ngOnInit(): void {
    this.user = this.localStoreService.getUser();
  }

  showAvatarMenu = false;
  toggleAvatarMenu() {
    this.showAvatarMenu = !this.showAvatarMenu;
  }
}
