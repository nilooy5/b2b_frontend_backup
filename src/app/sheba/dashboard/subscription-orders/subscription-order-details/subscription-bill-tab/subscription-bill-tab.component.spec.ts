import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionBillTabComponent } from './subscription-bill-tab.component';

describe('SubscriptionBillTabComponent', () => {
  let component: SubscriptionBillTabComponent;
  let fixture: ComponentFixture<SubscriptionBillTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionBillTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionBillTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
