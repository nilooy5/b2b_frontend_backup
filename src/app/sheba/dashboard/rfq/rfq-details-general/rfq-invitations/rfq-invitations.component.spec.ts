import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqInvitationsComponent } from './rfq-invitations.component';

describe('RfqInvitationsComponent', () => {
  let component: RfqInvitationsComponent;
  let fixture: ComponentFixture<RfqInvitationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqInvitationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqInvitationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
