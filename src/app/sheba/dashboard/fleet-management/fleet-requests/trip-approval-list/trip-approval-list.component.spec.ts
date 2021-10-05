import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripApprovalListComponent } from './trip-approval-list.component';

describe('TripApprovalListComponent', () => {
  let component: TripApprovalListComponent;
  let fixture: ComponentFixture<TripApprovalListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripApprovalListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripApprovalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
