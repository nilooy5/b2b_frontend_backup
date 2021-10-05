import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionCartComponent } from './subscription-cart.component';

describe('SubscriptionCartComponent', () => {
  let component: SubscriptionCartComponent;
  let fixture: ComponentFixture<SubscriptionCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
