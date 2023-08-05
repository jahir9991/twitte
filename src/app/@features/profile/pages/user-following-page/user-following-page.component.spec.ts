import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFollowingPageComponent } from './user-following-page.component';

describe('UserFollowingPageComponent', () => {
  let component: UserFollowingPageComponent;
  let fixture: ComponentFixture<UserFollowingPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserFollowingPageComponent]
    });
    fixture = TestBed.createComponent(UserFollowingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
