import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TweetEntity } from 'src/app/@entities/tweet.entity';

@Component({
  selector: 'app-tweet-card',
  templateUrl: './tweet-card.component.html',
  styleUrls: ['./tweet-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TweetCardComponent {
  @Input() payload: TweetEntity;
}
