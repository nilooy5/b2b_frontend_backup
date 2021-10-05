import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RfqOrdersListTableComponent} from './rfq-orders-list-table.component';

describe('RfqOrdersListTableComponent', () => {
    let component: RfqOrdersListTableComponent;
    let fixture: ComponentFixture<RfqOrdersListTableComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RfqOrdersListTableComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RfqOrdersListTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
