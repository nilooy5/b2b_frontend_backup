import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderParticipateConfirmationComponent } from './tender-participate-confirmation.component';

describe('TenderParticipateConfirmationComponent', () => {
  let component: TenderParticipateConfirmationComponent;
  let fixture: ComponentFixture<TenderParticipateConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderParticipateConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderParticipateConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
