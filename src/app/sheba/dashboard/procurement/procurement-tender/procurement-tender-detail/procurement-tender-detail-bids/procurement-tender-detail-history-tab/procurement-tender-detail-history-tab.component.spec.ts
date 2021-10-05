import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementTenderDetailHistoryTabComponent } from './procurement-tender-detail-history-tab.component';

describe('ProcurementTenderDetailHistoryTabComponent', () => {
  let component: ProcurementTenderDetailHistoryTabComponent;
  let fixture: ComponentFixture<ProcurementTenderDetailHistoryTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcurementTenderDetailHistoryTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementTenderDetailHistoryTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
