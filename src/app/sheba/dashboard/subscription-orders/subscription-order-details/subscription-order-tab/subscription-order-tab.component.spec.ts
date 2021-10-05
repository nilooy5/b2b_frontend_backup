import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionOrderTabComponent } from './subscription-order-tab.component';

describe('SubscriptionOrderTabComponent', () => {
  let component: SubscriptionOrderTabComponent;
  let fixture: ComponentFixture<SubscriptionOrderTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionOrderTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionOrderTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
