import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchFacade } from './search.facade';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SearchFacade],
})
export class SearchComponent {
  constructor(private searchFacade: SearchFacade) {}

  currentPageData$ = this.searchFacade.currentPageData$;
  status$ = this.searchFacade.status$;
  statusEnum = this.searchFacade.statusEnum;

  searchText(value: string) {
    if (value.length < 3) {
      this.status$.next(this.statusEnum.MIN_LENGTH);
      return;
    }
    this.searchFacade.searchTerm$.next(value);
  }

  identify = (index: number, item: any) => item;
}
