import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoWorkersConfirmationMessageComponent } from './co-workers-confirmation-message.component';

describe('CoWorkersConfirmationMessageComponent', () => {
  let component: CoWorkersConfirmationMessageComponent;
  let fixture: ComponentFixture<CoWorkersConfirmationMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoWorkersConfirmationMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoWorkersConfirmationMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
