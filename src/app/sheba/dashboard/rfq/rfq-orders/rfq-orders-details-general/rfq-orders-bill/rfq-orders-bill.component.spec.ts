import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RfqOrdersBillComponent} from './rfq-orders-bill.component';

describe('RfqOrdersBillComponent', () => {
    let component: RfqOrdersBillComponent;
    let fixture: ComponentFixture<RfqOrdersBillComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RfqOrdersBillComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RfqOrdersBillComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
