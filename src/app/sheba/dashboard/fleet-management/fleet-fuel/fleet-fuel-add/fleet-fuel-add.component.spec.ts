import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetFuelAddComponent } from './fleet-fuel-add.component';

describe('FleetFuelAddComponent', () => {
  let component: FleetFuelAddComponent;
  let fixture: ComponentFixture<FleetFuelAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetFuelAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetFuelAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
