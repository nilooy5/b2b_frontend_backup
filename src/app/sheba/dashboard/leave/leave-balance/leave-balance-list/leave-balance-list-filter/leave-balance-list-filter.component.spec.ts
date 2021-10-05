import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveBalanceListFilterComponent } from './leave-balance-list-filter.component';

describe('LeaveBalanceListFilterComponent', () => {
  let component: LeaveBalanceListFilterComponent;
  let fixture: ComponentFixture<LeaveBalanceListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveBalanceListFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveBalanceListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
