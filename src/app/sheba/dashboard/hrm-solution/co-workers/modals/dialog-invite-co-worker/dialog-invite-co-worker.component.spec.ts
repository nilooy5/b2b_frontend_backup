import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogInviteCoWorkerComponent } from './dialog-invite-co-worker.component';

describe('DailogInviteCoWorkerComponent', () => {
  let component: DialogInviteCoWorkerComponent;
  let fixture: ComponentFixture<DialogInviteCoWorkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogInviteCoWorkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogInviteCoWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
