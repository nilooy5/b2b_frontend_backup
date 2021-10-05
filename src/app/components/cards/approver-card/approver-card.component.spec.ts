import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproverCardComponent } from './approver-card.component';

describe('ApproverCardComponent', () => {
  let component: ApproverCardComponent;
  let fixture: ComponentFixture<ApproverCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproverCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproverCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
