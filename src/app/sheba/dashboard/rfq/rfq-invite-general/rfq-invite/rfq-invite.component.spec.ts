import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqInviteComponent } from './rfq-invite.component';

describe('RfqInviteComponent', () => {
  let component: RfqInviteComponent;
  let fixture: ComponentFixture<RfqInviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqInviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
