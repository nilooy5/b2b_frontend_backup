import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqOrdersBillPaymentsComponent } from './rfq-orders-bill-payments.component';

describe('RfqOrdersBillPaymentsComponent', () => {
  let component: RfqOrdersBillPaymentsComponent;
  let fixture: ComponentFixture<RfqOrdersBillPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqOrdersBillPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqOrdersBillPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
