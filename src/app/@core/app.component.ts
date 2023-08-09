import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'twitte';

  public promptEvent;
  public updateAvailable: boolean;
  showBar=true;

  constructor(
    private toastService: HotToastService,
    private swUpdate: SwUpdate
  ) {
    this.swUpdate.available.subscribe((evt) => {
      this.updateAvailable = true;
    });
    this.promptEvent?.prompt();
  }

  public reload() {
    this.swUpdate.activateUpdate().then(() => document.location.reload());
  }

  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e) {
    e.preventDefault();
    this.promptEvent = e;
  }

  public installPWA() {
    this.promptEvent.prompt();
  }

  public shouldInstall(): boolean {
    const d = !this.isRunningStandalone() && this.promptEvent;
    console.log(d);
    return d;
  }

  public isRunningStandalone(): boolean {
    return window.matchMedia('(display-mode: standalone)').matches;
  }

  close() {
    this.showBar=false;
  }
}
