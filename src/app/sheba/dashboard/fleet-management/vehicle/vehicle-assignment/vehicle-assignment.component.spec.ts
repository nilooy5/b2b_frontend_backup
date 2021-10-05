import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleAssignmentComponent } from './vehicle-assignment.component';

describe('VehicleAssignmentComponent', () => {
  let component: VehicleAssignmentComponent;
  let fixture: ComponentFixture<VehicleAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
