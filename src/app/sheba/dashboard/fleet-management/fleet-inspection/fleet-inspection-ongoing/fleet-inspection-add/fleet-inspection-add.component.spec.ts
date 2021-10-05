import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetInspectionAddComponent } from './fleet-inspection-add.component';

describe('FleetInspectionAddComponent', () => {
  let component: FleetInspectionAddComponent;
  let fixture: ComponentFixture<FleetInspectionAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetInspectionAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetInspectionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
