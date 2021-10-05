import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseEditableTableComponent } from './expense-editable-table.component';

describe('ExpenseEditableTableComponent', () => {
  let component: ExpenseEditableTableComponent;
  let fixture: ComponentFixture<ExpenseEditableTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseEditableTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseEditableTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
