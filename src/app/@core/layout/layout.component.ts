import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FollowingResponseModel } from 'src/app/@models/followingResponse.model';
import { ProfileApiService } from 'src/app/@services/api/profile-api.service';
import { UserApiService } from 'src/app/@services/api/user-api.service';
import { LocalStorageService } from 'src/app/@services/local-storage.service';
import { UserStore } from 'src/app/@services/user.store';

@UntilDestroy()
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  constructor(private UserStore: UserStore) {}
}
