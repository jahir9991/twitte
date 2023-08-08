import {
  Component,
  ElementRef,
  Injectable,
  Type,
  ViewChild,
} from '@angular/core';
import { UserListFacade } from './user-list.facade';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [UserListFacade],
})
export class UserListComponent {
  constructor(private userListFacade: UserListFacade) {}

  currentPageData$ = this.userListFacade.currentPageData$;
  status$ = this.userListFacade.status$;
  statusEnum = this.userListFacade.statusEnum;

  searchText(value: string) {
    if (value.length < 3) {
      this.status$.next(this.statusEnum.MIN_LENGTH);
      return;
    }
    this.userListFacade.searchTerm$.next(value);
  }

  identify = (index: number, item: any) => item;
}
