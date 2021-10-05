import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementOrdersDetailTabComponent } from './procurement-orders-detail-tab.component';

describe('ProcurementOrdersDetailTabComponent', () => {
  let component: ProcurementOrdersDetailTabComponent;
  let fixture: ComponentFixture<ProcurementOrdersDetailTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcurementOrdersDetailTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementOrdersDetailTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
