import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionHistoryListFilterComponent } from './inspection-history-list-filter.component';

describe('InspectionHistoryListFilterComponent', () => {
  let component: InspectionHistoryListFilterComponent;
  let fixture: ComponentFixture<InspectionHistoryListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionHistoryListFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionHistoryListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
