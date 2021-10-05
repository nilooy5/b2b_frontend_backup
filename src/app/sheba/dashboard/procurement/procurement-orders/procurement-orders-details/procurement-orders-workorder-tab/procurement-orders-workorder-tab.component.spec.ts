import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementOrdersWorkorderTabComponent } from './procurement-orders-workorder-tab.component';

describe('ProcurementOrdersWorkorderTabComponent', () => {
  let component: ProcurementOrdersWorkorderTabComponent;
  let fixture: ComponentFixture<ProcurementOrdersWorkorderTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcurementOrdersWorkorderTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementOrdersWorkorderTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
