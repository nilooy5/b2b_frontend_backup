import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionOrderListComponent } from './subscription-order-list.component';

describe('SubscriptionOrderListComponent', () => {
  let component: SubscriptionOrderListComponent;
  let fixture: ComponentFixture<SubscriptionOrderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionOrderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
