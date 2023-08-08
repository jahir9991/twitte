import { ChangeDetectionStrategy, Component } from '@angular/core';

import { UserFollowingPageFacade } from './user-following-page.facade';
import { ApiStatusEnum } from 'src/app/@shared/consts/ApiStatus.enum';

@Component({
  templateUrl: './user-following-page.component.html',
  styleUrls: ['./user-following-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UserFollowingPageFacade],
})
export class UserFollowingPageComponent {
  constructor(private modalFacade: UserFollowingPageFacade) {}
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
}
