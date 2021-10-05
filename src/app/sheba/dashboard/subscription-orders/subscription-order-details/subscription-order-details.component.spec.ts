import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionOrderDetailsComponent } from './subscription-order-details.component';

describe('SubscriptionOrderDetailsComponent', () => {
  let component: SubscriptionOrderDetailsComponent;
  let fixture: ComponentFixture<SubscriptionOrderDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionOrderDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
