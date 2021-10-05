import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceQuotationTableComponent } from './price-quotation-table.component';

describe('PriceQuotationTableComponent', () => {
  let component: PriceQuotationTableComponent;
  let fixture: ComponentFixture<PriceQuotationTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceQuotationTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceQuotationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
