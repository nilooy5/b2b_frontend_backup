import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetFuelHistoryComponent } from './fleet-fuel-history.component';

describe('FleetFuelHistoryComponent', () => {
  let component: FleetFuelHistoryComponent;
  let fixture: ComponentFixture<FleetFuelHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetFuelHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetFuelHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
