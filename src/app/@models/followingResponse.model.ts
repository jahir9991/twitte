import { UserEntity } from '../@entities/user.entity';

export interface FollowingResponseModel {
    count: number;
    followings: UserEntity[];
}
