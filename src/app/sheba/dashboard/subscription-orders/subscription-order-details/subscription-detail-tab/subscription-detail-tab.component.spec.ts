import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionDetailTabComponent } from './subscription-detail-tab.component';

describe('SubscriptionDetailTabComponent', () => {
  let component: SubscriptionDetailTabComponent;
  let fixture: ComponentFixture<SubscriptionDetailTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionDetailTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionDetailTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
