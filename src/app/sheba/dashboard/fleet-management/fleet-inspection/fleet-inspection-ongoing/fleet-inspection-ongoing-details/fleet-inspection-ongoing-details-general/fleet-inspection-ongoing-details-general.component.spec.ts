import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetInspectionOngoingDetailsGeneralComponent } from './fleet-inspection-ongoing-details-general.component';

describe('FleetInspectionOngoingDetailsGeneralComponent', () => {
  let component: FleetInspectionOngoingDetailsGeneralComponent;
  let fixture: ComponentFixture<FleetInspectionOngoingDetailsGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetInspectionOngoingDetailsGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetInspectionOngoingDetailsGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
