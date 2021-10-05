import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleAssignmentListItemComponent } from './vehicle-assignment-list-item.component';

describe('VehicleAssignmentListItemComponent', () => {
  let component: VehicleAssignmentListItemComponent;
  let fixture: ComponentFixture<VehicleAssignmentListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleAssignmentListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleAssignmentListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
