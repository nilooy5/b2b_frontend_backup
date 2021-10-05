import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementOrdersDetailsComponent } from './procurement-orders-details.component';

describe('ProcurementOrdersDetailsComponent', () => {
  let component: ProcurementOrdersDetailsComponent;
  let fixture: ComponentFixture<ProcurementOrdersDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcurementOrdersDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementOrdersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
