import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementTenderDetailQuotationComponent } from './procurement-tender-detail-quotation.component';

describe('ProcurementTenderDetailQuotationComponent', () => {
  let component: ProcurementTenderDetailQuotationComponent;
  let fixture: ComponentFixture<ProcurementTenderDetailQuotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcurementTenderDetailQuotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementTenderDetailQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
