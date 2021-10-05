import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionCategoryFilterComponent } from './subscription-category-filter.component';

describe('SubscriptionCategoryFilterComponent', () => {
  let component: SubscriptionCategoryFilterComponent;
  let fixture: ComponentFixture<SubscriptionCategoryFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionCategoryFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionCategoryFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
