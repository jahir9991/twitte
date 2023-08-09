import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UserApiService } from 'src/app/@services/api/user-api.service';
import { LocalStorageService } from 'src/app/@services/local-storage.service';

@UntilDestroy()
@Component({
  templateUrl: './profile-base-page.component.html',
  styleUrls: ['./profile-base-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileBasePageComponent {
  constructor(
    private localStorageService: LocalStorageService,
    private activeRoute: ActivatedRoute,
    private userApiService: UserApiService,
    private toastService: HotToastService
  ) {}
  currentUser;
  userId: string;
  myProfile = false;
  isFollowing;

  ngOnInit(): void {
    this.userId = this.activeRoute.snapshot.paramMap.get('id');
    this.currentUser = this.localStorageService.getUser();
    this.myProfile = this.userId == this.currentUser.id;
  }
  isAuthenticated = this.localStorageService.isAuthenticated();

  onOutletLoaded(component) {
    component.isMyProfile = this.userId == this.currentUser.id;
  }

  follow() {
    this.isFollowing=true;
    this.userApiService
      .followUser(this.userId)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (data) => {
          this.toastService.success(data.resp);
        },
      });
  }

  unfollow() {
    this.isFollowing=false;

    this.userApiService
      .unfollowUser(this.userId)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (data) => {
          this.toastService.info(data.resp);
        },
      });
  }
}
