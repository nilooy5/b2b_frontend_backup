import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderOtpPinComponent } from './tender-otp-pin.component';

describe('TenderOtpPinComponent', () => {
  let component: TenderOtpPinComponent;
  let fixture: ComponentFixture<TenderOtpPinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderOtpPinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderOtpPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
