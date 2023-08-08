import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserFollowerPageFacade } from './user-follower-page.facade';
import { ApiStatusEnum } from 'src/app/@shared/consts/ApiStatus.enum';

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

  identify = (index: number, item: any) => item;
}
