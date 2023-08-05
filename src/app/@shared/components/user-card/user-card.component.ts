import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserEntity } from 'src/app/@entities/user.entity';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent {
  @Input() user!: UserEntity;
}
