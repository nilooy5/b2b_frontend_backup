import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionAdditionalComponent } from './subscription-additional.component';

describe('SubscriptionAdditionalComponent', () => {
  let component: SubscriptionAdditionalComponent;
  let fixture: ComponentFixture<SubscriptionAdditionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionAdditionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionAdditionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
