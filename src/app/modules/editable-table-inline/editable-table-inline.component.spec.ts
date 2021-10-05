import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableTableInlineComponent } from './editable-table-inline.component';

describe('EditableTableInlineComponent', () => {
  let component: EditableTableInlineComponent;
  let fixture: ComponentFixture<EditableTableInlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableTableInlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableTableInlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
