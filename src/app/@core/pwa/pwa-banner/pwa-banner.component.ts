import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  OnDestroy,
  Output,
} from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SyncStorageService } from '../../../@services/syncStorage.service';
import { PwaFacade } from './pwa-banner.facade';
import { BehaviorSubject, Observable, Subscription, map, take } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-pwa-banner',
  templateUrl: './pwa-banner.component.html',
  styleUrls: ['./pwa-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PwaFacade],
})
export class PwaBannerComponent {

  promptEvent;
  updateAvailable: boolean;

  sub1: Subscription;
  sub2: Subscription;

  constructor(private swUpdate: SwUpdate, private pwaFacade: PwaFacade) {
   this.swUpdate.available
      .pipe(untilDestroyed(this))
      .subscribe((evt) => {
        this.updateAvailable = true;
      });
    this.promptEvent?.prompt();
  }
  ngOnInit(): void {}
  isBannerClosed$ = this.pwaFacade.isBannerClosed$;

  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e) {
    e.preventDefault();
    this.promptEvent = e;
  }

  installPWA() {
    this.promptEvent.prompt();
  }

  shouldInstall(): boolean {
    return !this.isRunningStandalone() && this.promptEvent;
  }

  isRunningStandalone(): boolean {
    return window.matchMedia('(display-mode: standalone)').matches;
  }

  reload() {
    this.swUpdate.activateUpdate().then(() => document.location.reload());
  }

  close() {
    this.pwaFacade.close();
  }
}
