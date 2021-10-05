import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqComparisonVendorListComponent } from './rfq-comparison-vendor-list.component';

describe('RfqComparisonVendorListComponent', () => {
  let component: RfqComparisonVendorListComponent;
  let fixture: ComponentFixture<RfqComparisonVendorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqComparisonVendorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqComparisonVendorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
