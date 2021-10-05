import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveBalanceDetailsComponent } from './leave-balance-details.component';

describe('LeaveBalanceDetailsComponent', () => {
  let component: LeaveBalanceDetailsComponent;
  let fixture: ComponentFixture<LeaveBalanceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveBalanceDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveBalanceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
