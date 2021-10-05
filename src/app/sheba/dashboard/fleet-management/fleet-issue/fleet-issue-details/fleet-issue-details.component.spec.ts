import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetIssueDetailsComponent } from './fleet-issue-details.component';

describe('FleetIssueDetailsComponent', () => {
  let component: FleetIssueDetailsComponent;
  let fixture: ComponentFixture<FleetIssueDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetIssueDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetIssueDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
