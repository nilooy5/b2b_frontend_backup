import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqOrdersListFilterComponent } from './rfq-orders-list-filter.component';

describe('RfqOrdersListFilterComponent', () => {
  let component: RfqOrdersListFilterComponent;
  let fixture: ComponentFixture<RfqOrdersListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqOrdersListFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqOrdersListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
