import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { UserFollowingPageFacade } from './user-following-page.facade';
import { ApiStatusEnum } from 'src/app/@shared/consts/ApiStatus.enum';
import { UserEntity } from 'src/app/@entities/user.entity';
import { UntilDestroy } from '@ngneat/until-destroy';



@UntilDestroy()
@Component({
  templateUrl: './user-following-page.component.html',
  styleUrls: ['./user-following-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UserFollowingPageFacade],
})
export class UserFollowingPageComponent {
  constructor(private modalFacade: UserFollowingPageFacade) {}

  @Input() isMyProfile: boolean;
  ngAfterViewInit(): void {
  }

  ApiStatusEnum = ApiStatusEnum;

  currentPageData$ = this.modalFacade.currentPageData$;
  currentPage$ = this.modalFacade.currentPage$;
  currentSize$ = this.modalFacade.currentSize$;
  apiStatus$ = this.modalFacade.apiStatus$;
  hasMore$ = this.modalFacade.hasMore$;

  loadMore() {
    this.currentPage$.next(this.currentPage$.value + 1);
  }

  identify = (index: number, item: any) => item;

  onUnfollowClick(user: UserEntity) {
    this.modalFacade.unfollowUser(user);
  }
  onFollowClick(user: UserEntity) {
    this.modalFacade.followUser(user);
  }
}
