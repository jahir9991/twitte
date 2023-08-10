import { Injectable, OnDestroy } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  Observable,
  combineLatest,
  combineLatestAll,
  combineLatestWith,
  concat,
  concatAll,
  concatMap,
  filter,
  forkJoin,
  map,
  merge,
  mergeAll,
  mergeMap,
  of,
  pipe,
  scan,
  startWith,
  switchMap,
  zip,
} from 'rxjs';
import { combineLatestInit } from 'rxjs/internal/observable/combineLatest';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { SyncStorageService } from 'src/app/@services/syncStorage.service';
import { BaseStore } from 'src/app/@shared/base.store';

@UntilDestroy()
@Injectable()
export class PwaFacade implements OnDestroy {
  private store = new BaseStore<boolean>(false, 'isBannerClosed');

  constructor(private syncStorageService: SyncStorageService) {}
  ngOnDestroy(): void {}

  syncEvent = this.syncStorageService.localStorageChanged$.pipe(
    filter((e) => e.key === 'isBannerClosed'),
    map((data) => JSON.parse(data.newValue) as boolean)
  );

  isBannerClosed$ = merge(this.syncEvent, this.store).pipe(
    switchMap((data) => {
      return of(data);
    })
  );
  close() {
    this.store.next(true);
  }
}
