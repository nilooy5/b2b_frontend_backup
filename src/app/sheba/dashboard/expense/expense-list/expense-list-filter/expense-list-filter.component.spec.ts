import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseListFilterComponent } from './expense-list-filter.component';

describe('ExpenseListFilterComponent', () => {
  let component: ExpenseListFilterComponent;
  let fixture: ComponentFixture<ExpenseListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseListFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
