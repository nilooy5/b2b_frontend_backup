import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionHistoryDetailsComponent } from './inspection-history-details.component';

describe('InspectionHistoryDetailsComponent', () => {
  let component: InspectionHistoryDetailsComponent;
  let fixture: ComponentFixture<InspectionHistoryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionHistoryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionHistoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
