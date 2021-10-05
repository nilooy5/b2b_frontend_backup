import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementOrdersFilterComponent } from './procurement-orders-filter.component';

describe('ProcurementOrdersFilterComponent', () => {
  let component: ProcurementOrdersFilterComponent;
  let fixture: ComponentFixture<ProcurementOrdersFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcurementOrdersFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementOrdersFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
