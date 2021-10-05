import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementTenderInviteComponent } from './procurement-tender-invite.component';

describe('ProcurementTenderInviteComponent', () => {
  let component: ProcurementTenderInviteComponent;
  let fixture: ComponentFixture<ProcurementTenderInviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcurementTenderInviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementTenderInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
