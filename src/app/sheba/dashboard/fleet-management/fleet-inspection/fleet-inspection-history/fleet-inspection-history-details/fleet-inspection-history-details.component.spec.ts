import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetInspectionHistoryDetailsComponent } from './fleet-inspection-history-details.component';

describe('FleetInspectionHistoryDetailsComponent', () => {
  let component: FleetInspectionHistoryDetailsComponent;
  let fixture: ComponentFixture<FleetInspectionHistoryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetInspectionHistoryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetInspectionHistoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
