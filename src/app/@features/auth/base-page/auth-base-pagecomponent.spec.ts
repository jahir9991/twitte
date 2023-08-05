import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthBasePageComponent } from './auth-base-page.component';

describe('LoginComponent', () => {
  let component: AuthBasePageComponent;
  let fixture: ComponentFixture<AuthBasePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthBasePageComponent],
    });
    fixture = TestBed.createComponent(AuthBasePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
