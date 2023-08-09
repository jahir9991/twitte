import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { UserEntity } from 'src/app/@entities/user.entity';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent {
  @Input() payload: UserEntity;
  @Input() followFeature: boolean = false;
  @Input() isFollowing: boolean;

  @Output() onUnfollowClick: EventEmitter<UserEntity> =
    new EventEmitter<UserEntity>();
  @Output() onFollowClick: EventEmitter<UserEntity> =
    new EventEmitter<UserEntity>();

  unfollow() {
    this.isFollowing = false;
    if (this.onUnfollowClick) {
      this.onUnfollowClick.emit(this.payload);
    }
  }
  follow() {
    this.isFollowing = true;
    if (this.onFollowClick) {
      this.onFollowClick.emit(this.payload);
    }
  }
}
