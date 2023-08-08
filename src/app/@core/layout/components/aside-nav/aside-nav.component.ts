import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserEntity } from 'src/app/@entities/user.entity';
import { LocalStorageService } from 'src/app/@services/local-storage.service';

@Component({
  selector: 'app-aside-nav',
  templateUrl: './aside-nav.component.html',
  styleUrls: ['./aside-nav.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsideNavComponent {
  constructor(
    private localStoreService: LocalStorageService,
    private route: ActivatedRoute
  ) {}

  user: any;

  ngOnInit(): void {
    this.user = this.localStoreService.getUser();
  }

  showAvatarMenu = false;
  toggleAvatarMenu() {
    console.log(this.showAvatarMenu);
    
    this.showAvatarMenu = !this.showAvatarMenu;
  }
}
