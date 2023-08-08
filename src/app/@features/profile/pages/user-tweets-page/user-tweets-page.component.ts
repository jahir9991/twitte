import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { UserTweetsPageFacade } from './user-tweets-page.facade';
import { ApiStatusEnum } from 'src/app/@shared/consts/ApiStatus.enum';

@Component({
  templateUrl: './user-tweets-page.component.html',
  styleUrls: ['./user-tweets-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UserTweetsPageFacade],
})
export class UserTweetsPageComponent implements AfterViewInit {
  constructor(private modalFacade: UserTweetsPageFacade) {}
  @Input() isMyProfile;
  ngAfterViewInit(): void {
    console.log('UserTweetsPageComponent>isMyprofile',this.isMyProfile);
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
}
