import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveRequestsListComponent } from './leave-requests-list.component';

describe('LeaveRequestsListComponent', () => {
  let component: LeaveRequestsListComponent;
  let fixture: ComponentFixture<LeaveRequestsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveRequestsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveRequestsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
