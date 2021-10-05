import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementOrdersBillTabComponent } from './procurement-orders-bill-tab.component';

describe('ProcurementOrdersBillTabComponent', () => {
  let component: ProcurementOrdersBillTabComponent;
  let fixture: ComponentFixture<ProcurementOrdersBillTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcurementOrdersBillTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementOrdersBillTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
