import { Component, Input } from '@angular/core';
import { TweetEntity } from 'src/app/@entities/tweet.entity';

@Component({
    selector: 'app-tweet-card',
    templateUrl: './tweet-card.component.html',
    styleUrls: ['./tweet-card.component.scss']
})
export class TweetCardComponent {

    @Input() payload: TweetEntity;

}
