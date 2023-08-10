import { Platform } from '@angular/cdk/platform';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'twitte::Home of idea';
  constructor(public platform: Platform) {}

  ngOnInit() {
   
  }
}
