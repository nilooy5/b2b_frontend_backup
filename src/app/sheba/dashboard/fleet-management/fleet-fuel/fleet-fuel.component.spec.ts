import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetFuelComponent } from './fleet-fuel.component';

describe('FleetFuelComponent', () => {
  let component: FleetFuelComponent;
  let fixture: ComponentFixture<FleetFuelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetFuelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetFuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
