import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCoWorkersBasicConfirmComponent } from './dialog-co-workers-basic-confirm.component';

describe('DialogCoWorkersBasicConfirmComponent', () => {
  let component: DialogCoWorkersBasicConfirmComponent;
  let fixture: ComponentFixture<DialogCoWorkersBasicConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCoWorkersBasicConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCoWorkersBasicConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
