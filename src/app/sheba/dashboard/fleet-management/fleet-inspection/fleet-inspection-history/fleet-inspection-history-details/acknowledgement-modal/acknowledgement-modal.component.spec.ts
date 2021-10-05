import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcknowledgementModalComponent } from './acknowledgement-modal.component';

describe('AcknowledgementModalComponent', () => {
  let component: AcknowledgementModalComponent;
  let fixture: ComponentFixture<AcknowledgementModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcknowledgementModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcknowledgementModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
