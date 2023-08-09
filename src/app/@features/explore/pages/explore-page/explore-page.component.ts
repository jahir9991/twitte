import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserEntity } from 'src/app/@entities/user.entity';
import { ExplorePageFacade } from './explore-page.facade';
import { ApiStatusEnum } from 'src/app/@shared/consts/ApiStatus.enum';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  templateUrl: './explore-page.component.html',
  styleUrls: ['./explore-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ExplorePageFacade],
})
export class ExplorePageComponent {
  constructor(private modalFacade: ExplorePageFacade) {}
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
