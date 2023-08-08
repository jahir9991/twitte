import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserFollowerPageFacade } from './user-follower-page.facade';
import { ApiStatusEnum } from 'src/app/@shared/consts/ApiStatus.enum';
import { UserEntity } from 'src/app/@entities/user.entity';

@Component({
  templateUrl: './user-follower-page.component.html',
  styleUrls: ['./user-follower-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UserFollowerPageFacade],
})
export class UserFollowerPageComponent {
  constructor(private modalFacade: UserFollowerPageFacade) {}
  ApiStatusEnum = ApiStatusEnum;

  currentPageData$ = this.modalFacade.currentPageData$;
  currentPage$ = this.modalFacade.currentPage$;
  currentSize$ = this.modalFacade.currentSize$;
  apiStatus$ = this.modalFacade.apiStatus$;
  hasMore$ = this.modalFacade.hasMore$;

  loadMore() {
    this.currentPage$.next(this.currentPage$.value + 1);
  }

  onUnfollowClick(user: UserEntity) {
    this.modalFacade.unfollowUser(user);
  }
  onFollowClick(user: UserEntity) {
    this.modalFacade.followUser(user);
  }

  identify = (index: number, item: any) => item;
}
