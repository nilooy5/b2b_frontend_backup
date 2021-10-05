import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetIssueListComponent } from './fleet-issue-list.component';

describe('FleetIssueListComponent', () => {
  let component: FleetIssueListComponent;
  let fixture: ComponentFixture<FleetIssueListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetIssueListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetIssueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
