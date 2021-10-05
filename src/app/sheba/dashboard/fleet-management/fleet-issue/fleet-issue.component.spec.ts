import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetIssueComponent } from './fleet-issue.component';

describe('FleetIssueComponent', () => {
  let component: FleetIssueComponent;
  let fixture: ComponentFixture<FleetIssueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetIssueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
