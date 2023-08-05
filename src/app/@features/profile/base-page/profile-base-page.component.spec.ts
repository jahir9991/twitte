import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBasePageComponent } from './profile-base-page.component';

describe('ProfileBasePageComponent', () => {
  let component: ProfileBasePageComponent;
  let fixture: ComponentFixture<ProfileBasePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileBasePageComponent]
    });
    fixture = TestBed.createComponent(ProfileBasePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
