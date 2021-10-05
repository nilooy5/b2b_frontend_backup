import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveRequestsDetailsComponent } from './leave-requests-details.component';

describe('LeaveRequestsDetailsComponent', () => {
  let component: LeaveRequestsDetailsComponent;
  let fixture: ComponentFixture<LeaveRequestsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveRequestsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveRequestsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
