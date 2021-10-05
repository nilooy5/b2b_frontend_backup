import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveRequestsListFilterComponent } from './leave-requests-list-filter.component';

describe('LeaveRequestsListFilterComponent', () => {
  let component: LeaveRequestsListFilterComponent;
  let fixture: ComponentFixture<LeaveRequestsListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveRequestsListFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveRequestsListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
