import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTweetsPageComponent } from './user-tweets-page.component';

describe('UserTweetsPageComponent', () => {
  let component: UserTweetsPageComponent;
  let fixture: ComponentFixture<UserTweetsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserTweetsPageComponent]
    });
    fixture = TestBed.createComponent(UserTweetsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
