import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveBalanceListEmptyComponent } from './leave-balance-list-empty.component';

describe('LeaveBalanceListEmptyComponent', () => {
  let component: LeaveBalanceListEmptyComponent;
  let fixture: ComponentFixture<LeaveBalanceListEmptyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveBalanceListEmptyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveBalanceListEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
