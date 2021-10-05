import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetIssueListFilterComponent } from './fleet-issue-list-filter.component';

describe('FleetIssueListFilterComponent', () => {
  let component: FleetIssueListFilterComponent;
  let fixture: ComponentFixture<FleetIssueListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetIssueListFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetIssueListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
