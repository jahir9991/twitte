import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFollowerPageComponent } from './user-follower-page.component';

describe('UserFollowerPageComponent', () => {
  let component: UserFollowerPageComponent;
  let fixture: ComponentFixture<UserFollowerPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserFollowerPageComponent]
    });
    fixture = TestBed.createComponent(UserFollowerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
