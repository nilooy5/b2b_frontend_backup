import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqShareDialogComponent } from './rfq-share-dialog.component';

describe('RfqShareDialogComponent', () => {
  let component: RfqShareDialogComponent;
  let fixture: ComponentFixture<RfqShareDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqShareDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqShareDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
