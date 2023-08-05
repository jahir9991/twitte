import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorePageComponent } from './explore-page.component';

describe('ExplorePageComponent', () => {
  let component: ExplorePageComponent;
  let fixture: ComponentFixture<ExplorePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExplorePageComponent]
    });
    fixture = TestBed.createComponent(ExplorePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
