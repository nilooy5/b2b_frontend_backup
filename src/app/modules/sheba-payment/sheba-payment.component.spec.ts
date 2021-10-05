import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShebaPaymentComponent } from './sheba-payment.component';

describe('ShebaPaymentComponent', () => {
  let component: ShebaPaymentComponent;
  let fixture: ComponentFixture<ShebaPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShebaPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShebaPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
