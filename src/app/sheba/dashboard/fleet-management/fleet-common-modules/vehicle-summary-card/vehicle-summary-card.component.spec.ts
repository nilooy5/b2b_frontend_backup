import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleSummaryCardComponent } from './vehicle-summary-card.component';

describe('VehicleSummaryCardComponent', () => {
  let component: VehicleSummaryCardComponent;
  let fixture: ComponentFixture<VehicleSummaryCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleSummaryCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleSummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
