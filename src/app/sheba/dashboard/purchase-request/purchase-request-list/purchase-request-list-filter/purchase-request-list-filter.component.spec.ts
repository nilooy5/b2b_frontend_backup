import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseRequestListFilterComponent } from './purchase-request-list-filter.component';

describe('PurchaseRequestListFilterComponent', () => {
  let component: PurchaseRequestListFilterComponent;
  let fixture: ComponentFixture<PurchaseRequestListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseRequestListFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseRequestListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
