import { TweetEntity,  } from '../@entities/tweet.entity';
import { UserEntity } from '../@entities/user.entity';

export interface UserSearchResponseModel {
  count: number;
  search_results: UserEntity[];
}
