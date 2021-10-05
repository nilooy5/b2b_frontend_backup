import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionPartnerComponent } from './subscription-partner.component';

describe('SubscriptionPartnerComponent', () => {
  let component: SubscriptionPartnerComponent;
  let fixture: ComponentFixture<SubscriptionPartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionPartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
