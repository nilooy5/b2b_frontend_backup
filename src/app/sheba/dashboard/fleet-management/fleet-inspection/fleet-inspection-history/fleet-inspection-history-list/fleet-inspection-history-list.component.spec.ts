import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetInspectionHistoryListComponent } from './fleet-inspection-history-list.component';

describe('FleetInspectionHistoryListComponent', () => {
  let component: FleetInspectionHistoryListComponent;
  let fixture: ComponentFixture<FleetInspectionHistoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetInspectionHistoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetInspectionHistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
