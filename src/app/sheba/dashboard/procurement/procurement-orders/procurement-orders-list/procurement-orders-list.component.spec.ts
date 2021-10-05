import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementOrdersListComponent } from './procurement-orders-list.component';

describe('ProcurementOrdersListComponent', () => {
  let component: ProcurementOrdersListComponent;
  let fixture: ComponentFixture<ProcurementOrdersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcurementOrdersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementOrdersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
