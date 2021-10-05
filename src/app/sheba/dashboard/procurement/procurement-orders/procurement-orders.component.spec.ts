import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementOrdersComponent } from './procurement-orders.component';

describe('ProcurementOrdersComponent', () => {
  let component: ProcurementOrdersComponent;
  let fixture: ComponentFixture<ProcurementOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcurementOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
