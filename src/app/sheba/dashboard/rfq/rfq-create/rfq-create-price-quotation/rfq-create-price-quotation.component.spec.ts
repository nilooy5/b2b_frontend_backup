import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqCreatePriceQuotationComponent } from './rfq-create-price-quotation.component';

describe('RfqCreatePriceQuotationComponent', () => {
  let component: RfqCreatePriceQuotationComponent;
  let fixture: ComponentFixture<RfqCreatePriceQuotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqCreatePriceQuotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqCreatePriceQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
