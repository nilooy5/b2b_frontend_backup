import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionHistoryListComponent } from './inspection-history-list.component';

describe('InspectionHistoryListComponent', () => {
  let component: InspectionHistoryListComponent;
  let fixture: ComponentFixture<InspectionHistoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionHistoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionHistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
