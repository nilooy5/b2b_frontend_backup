import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqInviteGeneralComponent } from './rfq-invite-general.component';

describe('RfqInviteGeneralComponent', () => {
  let component: RfqInviteGeneralComponent;
  let fixture: ComponentFixture<RfqInviteGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqInviteGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqInviteGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
