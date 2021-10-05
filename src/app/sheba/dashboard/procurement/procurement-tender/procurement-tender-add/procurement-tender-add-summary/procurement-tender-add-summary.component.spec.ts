import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementTenderAddSummaryComponent } from './procurement-tender-add-summary.component';

describe('ProcurementTenderAddSummaryComponent', () => {
  let component: ProcurementTenderAddSummaryComponent;
  let fixture: ComponentFixture<ProcurementTenderAddSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcurementTenderAddSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementTenderAddSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
