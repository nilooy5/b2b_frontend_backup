import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveBalanceListComponent } from './leave-balance-list.component';

describe('LeaveBalanceListComponent', () => {
  let component: LeaveBalanceListComponent;
  let fixture: ComponentFixture<LeaveBalanceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveBalanceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveBalanceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
