import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchFacade } from './search.facade';
import { UserEntity } from 'src/app/@entities/user.entity';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SearchFacade],
})
export class SearchComponent {
  constructor(private modalFacade: SearchFacade) {}

  currentPageData$ = this.modalFacade.currentPageData$;
  status$ = this.modalFacade.status$;
  statusEnum = this.modalFacade.statusEnum;

  searchText(value: string) {
    if (value.length < 3) {
      this.status$.next(this.statusEnum.MIN_LENGTH);
      return;
    }
    this.modalFacade.searchTerm$.next(value);
  }

  identify = (index: number, item: any) => item;


  onUnfollowClick(user: UserEntity) {
    this.modalFacade.unfollowUser(user);
  }
  onFollowClick(user: UserEntity) {
    this.modalFacade.followUser(user);
  }

}
