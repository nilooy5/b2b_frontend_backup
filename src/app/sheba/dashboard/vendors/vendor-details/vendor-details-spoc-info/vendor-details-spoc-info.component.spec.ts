import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorDetailsSpocInfoComponent } from './vendor-details-spoc-info.component';

describe('VendorDetailsSpocInfoComponent', () => {
  let component: VendorDetailsSpocInfoComponent;
  let fixture: ComponentFixture<VendorDetailsSpocInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorDetailsSpocInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorDetailsSpocInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
