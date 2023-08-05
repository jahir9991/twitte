import { TweetEntity } from '../@entities/tweet.entity';

export interface TimelineResponseModel {
  count: number;
  timeline: TweetEntity[];
}
