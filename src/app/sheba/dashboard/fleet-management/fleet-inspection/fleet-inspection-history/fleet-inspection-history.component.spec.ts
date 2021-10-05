import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetInspectionHistoryComponent } from './fleet-inspection-history.component';

describe('FleetInspectionHistoryComponent', () => {
  let component: FleetInspectionHistoryComponent;
  let fixture: ComponentFixture<FleetInspectionHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetInspectionHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetInspectionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
