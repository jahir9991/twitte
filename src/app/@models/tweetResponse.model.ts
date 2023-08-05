import { TweetEntity } from '../@entities/tweet.entity';

export interface TweetResponseModel {
    count: number;
    tweets: TweetEntity[];
}
