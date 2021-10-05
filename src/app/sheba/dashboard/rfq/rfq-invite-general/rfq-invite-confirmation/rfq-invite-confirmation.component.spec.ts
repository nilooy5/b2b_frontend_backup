import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqInviteConfirmationComponent } from './rfq-invite-confirmation.component';

describe('RfqInviteConfirmationComponent', () => {
  let component: RfqInviteConfirmationComponent;
  let fixture: ComponentFixture<RfqInviteConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqInviteConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqInviteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
