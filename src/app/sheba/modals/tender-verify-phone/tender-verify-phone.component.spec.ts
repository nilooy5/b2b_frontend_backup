import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderVerifyPhoneComponent } from './tender-verify-phone.component';

describe('TenderVerifyPhoneComponent', () => {
  let component: TenderVerifyPhoneComponent;
  let fixture: ComponentFixture<TenderVerifyPhoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderVerifyPhoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderVerifyPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
