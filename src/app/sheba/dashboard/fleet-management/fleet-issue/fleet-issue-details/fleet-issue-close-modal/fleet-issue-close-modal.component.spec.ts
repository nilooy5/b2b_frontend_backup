import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetIssueCloseModalComponent } from './fleet-issue-close-modal.component';

describe('FleetIssueCloseModalComponent', () => {
  let component: FleetIssueCloseModalComponent;
  let fixture: ComponentFixture<FleetIssueCloseModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetIssueCloseModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetIssueCloseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
