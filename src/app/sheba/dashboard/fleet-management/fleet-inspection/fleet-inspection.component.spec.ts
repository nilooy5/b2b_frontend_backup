import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetInspectionComponent } from './fleet-inspection.component';

describe('FleetInspectionComponent', () => {
  let component: FleetInspectionComponent;
  let fixture: ComponentFixture<FleetInspectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetInspectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
