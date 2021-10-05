import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcknowledgeNoteModalComponent } from './acknowledge-note-modal.component';

describe('AcknowledgeNoteModalComponent', () => {
  let component: AcknowledgeNoteModalComponent;
  let fixture: ComponentFixture<AcknowledgeNoteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcknowledgeNoteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcknowledgeNoteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
