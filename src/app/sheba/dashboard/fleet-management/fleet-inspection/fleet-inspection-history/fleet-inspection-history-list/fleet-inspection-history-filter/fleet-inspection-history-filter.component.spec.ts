import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetInspectionHistoryFilterComponent } from './fleet-inspection-history-filter.component';

describe('FleetInspectionHistoryFilterComponent', () => {
  let component: FleetInspectionHistoryFilterComponent;
  let fixture: ComponentFixture<FleetInspectionHistoryFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetInspectionHistoryFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetInspectionHistoryFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
