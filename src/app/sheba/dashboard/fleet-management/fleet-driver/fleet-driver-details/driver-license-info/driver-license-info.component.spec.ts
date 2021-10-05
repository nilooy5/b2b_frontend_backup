import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverLicenseInfoComponent } from './driver-license-info.component';

describe('DriverLicenseInfoComponent', () => {
  let component: DriverLicenseInfoComponent;
  let fixture: ComponentFixture<DriverLicenseInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverLicenseInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverLicenseInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
