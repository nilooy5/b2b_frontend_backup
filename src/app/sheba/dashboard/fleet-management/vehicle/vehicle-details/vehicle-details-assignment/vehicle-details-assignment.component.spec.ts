import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleDetailsAssignmentComponent } from './vehicle-details-assignment.component';

describe('VehicleDetailsAssignmentComponent', () => {
  let component: VehicleDetailsAssignmentComponent;
  let fixture: ComponentFixture<VehicleDetailsAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleDetailsAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleDetailsAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
