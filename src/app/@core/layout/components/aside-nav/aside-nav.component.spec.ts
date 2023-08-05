import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideNavComponent } from './aside-nav.component';

describe('AsideNavComponent', () => {
    let component: AsideNavComponent;
    let fixture: ComponentFixture<AsideNavComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AsideNavComponent]
        });
        fixture = TestBed.createComponent(AsideNavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
