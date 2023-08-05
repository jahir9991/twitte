import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileNavComponent } from './mobile-nav.component';

describe('MobileNavComponent', () => {
    let component: MobileNavComponent;
    let fixture: ComponentFixture<MobileNavComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [MobileNavComponent]
        });
        fixture = TestBed.createComponent(MobileNavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
