import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementTenderBidVendorCardComponent } from './procurement-tender-bid-vendor-card.component';

describe('ProcurementTenderBidVendorCardComponent', () => {
  let component: ProcurementTenderBidVendorCardComponent;
  let fixture: ComponentFixture<ProcurementTenderBidVendorCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcurementTenderBidVendorCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementTenderBidVendorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
