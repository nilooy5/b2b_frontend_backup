import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqCreateAttachmentComponent } from './rfq-create-attachment.component';

describe('RfqCreateAttachmentComponent', () => {
  let component: RfqCreateAttachmentComponent;
  let fixture: ComponentFixture<RfqCreateAttachmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqCreateAttachmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqCreateAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
