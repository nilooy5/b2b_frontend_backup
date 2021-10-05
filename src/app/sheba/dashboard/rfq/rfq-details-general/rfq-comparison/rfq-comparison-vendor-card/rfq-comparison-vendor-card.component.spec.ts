import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqComparisonVendorCardComponent } from './rfq-comparison-vendor-card.component';

describe('RfqComparisonVendorCardComponent', () => {
  let component: RfqComparisonVendorCardComponent;
  let fixture: ComponentFixture<RfqComparisonVendorCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqComparisonVendorCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqComparisonVendorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
