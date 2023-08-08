import { Injectable, OnDestroy, inject } from '@angular/core';
import { BaseStore } from '../@shared/base.store';
import { UserEntity } from '../@entities/user.entity';

@Injectable({ providedIn: 'root' })
export class UserStore implements OnDestroy {
  userFollowingList = new BaseStore<UserEntity[]>([]);

  constructor() {
    console.log("UserStore constructor"); 
  }
    ngOnDestroy(): void {
    console.log("UserStore ngOnDestroy"); 
       
    }
}
