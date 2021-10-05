import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetFuelHistoryFilterComponent } from './fleet-fuel-history-filter.component';

describe('FleetFuelHistoryFilterComponent', () => {
  let component: FleetFuelHistoryFilterComponent;
  let fixture: ComponentFixture<FleetFuelHistoryFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetFuelHistoryFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetFuelHistoryFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
