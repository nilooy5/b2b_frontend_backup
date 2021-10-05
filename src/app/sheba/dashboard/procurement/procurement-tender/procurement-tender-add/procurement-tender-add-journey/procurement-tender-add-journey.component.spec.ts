import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementTenderAddJourneyComponent } from './procurement-tender-add-journey.component';

describe('ProcurementTenderAddJourneyComponent', () => {
  let component: ProcurementTenderAddJourneyComponent;
  let fixture: ComponentFixture<ProcurementTenderAddJourneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcurementTenderAddJourneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementTenderAddJourneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
