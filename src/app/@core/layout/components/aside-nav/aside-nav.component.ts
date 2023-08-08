import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  ViewRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Content } from '@ngneat/overview';
import { UserEntity } from 'src/app/@entities/user.entity';
import { LocalStorageService } from 'src/app/@services/local-storage.service';

@Component({
  selector: 'app-aside-nav',
  templateUrl: './aside-nav.component.html',
  styleUrls: ['./aside-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsideNavComponent {
  constructor(private localStoreService: LocalStorageService) {}

  @ViewChild('template') template: Content;

  user: any;

  ngOnInit(): void {
    this.user = this.localStoreService.getUser();
  }

  showAvatarMenu = false;
  toggleAvatarMenu() {
    this.showAvatarMenu = !this.showAvatarMenu;
  }
}
