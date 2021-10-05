import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalListFilterComponent } from './approval-list-filter.component';

describe('ApprovalListFilterComponent', () => {
  let component: ApprovalListFilterComponent;
  let fixture: ComponentFixture<ApprovalListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalListFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
