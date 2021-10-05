import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetFuelDetailsComponent } from './fleet-fuel-details.component';

describe('FleetFuelDetailsComponent', () => {
  let component: FleetFuelDetailsComponent;
  let fixture: ComponentFixture<FleetFuelDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetFuelDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetFuelDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
