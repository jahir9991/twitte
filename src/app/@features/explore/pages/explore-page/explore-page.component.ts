import { Component } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  map,
  of,
  scan,
  switchMap,
  tap,
} from 'rxjs';
import { UserResponseModel } from 'src/app/@models/userResponse.model';
import { UserApiService } from 'src/app/@services/api/user-api.service';

@Component({
  templateUrl: './explore-page.component.html',
  styleUrls: ['./explore-page.component.scss'],
})
export class ExplorePageComponent {
  constructor(private userApiService: UserApiService) {}

  currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  currentSize$: BehaviorSubject<number> = new BehaviorSubject<number>(20);
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  hasMore$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  currentPageData$ = combineLatest([this.currentPage$, this.currentSize$]).pipe(
    switchMap(([currentPage, currentSize]) =>
      this.userApiService.getUsers(currentPage, currentSize)
    ),
    catchError((err) => of([])),
    tap((data: UserResponseModel) =>
      this.hasMore$.next(data.count == this.currentSize$.value)
    ),
    map((data: UserResponseModel) => data.users),
    scan((acc, data) => {
      return this.currentPage$.value === 1 ? data : [...acc, ...data];
    }, [])
  );

  loadMore() {
    console.log("scroll");
    
    if (!this.hasMore$.value) return;
    this.currentPage$.next(this.currentPage$.value + 1);
  }
  identify = (index: number, item: any) => item;
}
