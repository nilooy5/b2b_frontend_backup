import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveRequestsListEmptyComponent } from './leave-requests-list-empty.component';

describe('LeaveRequestsListEmptyComponent', () => {
  let component: LeaveRequestsListEmptyComponent;
  let fixture: ComponentFixture<LeaveRequestsListEmptyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveRequestsListEmptyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveRequestsListEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
