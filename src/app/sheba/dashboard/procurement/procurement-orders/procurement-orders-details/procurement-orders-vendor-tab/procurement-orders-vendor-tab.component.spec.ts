import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementOrdersVendorTabComponent } from './procurement-orders-vendor-tab.component';

describe('ProcurementOrdersVendorTabComponent', () => {
  let component: ProcurementOrdersVendorTabComponent;
  let fixture: ComponentFixture<ProcurementOrdersVendorTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcurementOrdersVendorTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementOrdersVendorTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
