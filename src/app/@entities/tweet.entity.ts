import { UserEntity } from "./user.entity";


export type TweetEntity = {
  id: string;
  content: string;
  published: string;
  user: UserEntity;
};
