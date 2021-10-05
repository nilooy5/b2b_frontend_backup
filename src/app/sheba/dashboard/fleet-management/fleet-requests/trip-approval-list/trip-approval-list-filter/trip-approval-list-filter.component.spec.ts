import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripApprovalListFilterComponent } from './trip-approval-list-filter.component';

describe('TripApprovalListFilterComponent', () => {
  let component: TripApprovalListFilterComponent;
  let fixture: ComponentFixture<TripApprovalListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripApprovalListFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripApprovalListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
