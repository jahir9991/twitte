import { TweetEntity } from '../@entities/tweet.entity';
import { UserEntity } from '../@entities/user.entity';

export interface UserResponseModel {
  count: number;
  users: UserEntity[];
}
