import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetInspectionOngoingDetailsHistoryComponent } from './fleet-inspection-ongoing-details-history.component';

describe('FleetInspectionOngoingDetailsHistoryComponent', () => {
  let component: FleetInspectionOngoingDetailsHistoryComponent;
  let fixture: ComponentFixture<FleetInspectionOngoingDetailsHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetInspectionOngoingDetailsHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetInspectionOngoingDetailsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
