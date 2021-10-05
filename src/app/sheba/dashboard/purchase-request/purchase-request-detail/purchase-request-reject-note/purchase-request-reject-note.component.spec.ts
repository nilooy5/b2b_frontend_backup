import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseRequestRejectNoteComponent } from './purchase-request-reject-note.component';

describe('PurchaseRequestRejectNoteComponent', () => {
  let component: PurchaseRequestRejectNoteComponent;
  let fixture: ComponentFixture<PurchaseRequestRejectNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseRequestRejectNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseRequestRejectNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
