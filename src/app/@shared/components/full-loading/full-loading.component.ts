import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-full-loading',
  templateUrl: './full-loading.component.html',
  styleUrls: ['./full-loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FullLoadingComponent {

}
