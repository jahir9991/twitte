import { UserEntity } from "../@entities/user.entity";

export interface FollowerResponseModel {
    count: number;
    followers: UserEntity[];
}
