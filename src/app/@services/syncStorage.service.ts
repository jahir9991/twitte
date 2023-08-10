import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, filter, fromEvent, share } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SyncStorageService implements OnDestroy {
  private onSubject = new Subject<{ key: string; value: any }>();
  public changes = this.onSubject.asObservable().pipe(share());

  public localStorageChanged$: Observable<StorageEvent> =
    fromEvent<StorageEvent>(window, 'storage');
  // .pipe(
  //   filter(
  //     response => response.key === slideStorageKey,
  //   ),
  // );

  constructor() {
    // this.start();
  }

  ngOnDestroy() {
    // this.stop();
  }

  getStorage() {
    let s = [];
    for (let i = 0; i < localStorage.length; i++) {
      s.push({
        key: localStorage.key(i),
        value: JSON.parse(localStorage.getItem(localStorage.key(i))),
      });
    }
    return s;
  }

  store(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
    this.onSubject.next({ key: key, value: data });
  }

  clear(key) {
    localStorage.removeItem(key);
    this.onSubject.next({ key: key, value: null });
  }

  private start(): void {
    window.addEventListener('storage', this.storageEventListener.bind(this));
  }

  private storageEventListener(event: StorageEvent) {
    if (event.storageArea == localStorage) {
      let v;
      try {
        v = JSON.parse(event.newValue);
      } catch (e) {
        v = event.newValue;
      }
      this.onSubject.next({ key: event.key, value: v });
    }
  }

  private stop(): void {
    window.removeEventListener('storage', this.storageEventListener.bind(this));
    this.onSubject.complete();
  }
}
