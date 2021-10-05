import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeclineModalComponent } from './confirm-decline-modal.component';

describe('ConfirmDeclineModalComponent', () => {
  let component: ConfirmDeclineModalComponent;
  let fixture: ComponentFixture<ConfirmDeclineModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmDeclineModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeclineModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
