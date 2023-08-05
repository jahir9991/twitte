import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TweetCardComponent } from './tweet-card.componet';

describe('HomeComponent', () => {
    let component: TweetCardComponent;
    let fixture: ComponentFixture<TweetCardComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TweetCardComponent],
        });
        fixture = TestBed.createComponent(TweetCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
