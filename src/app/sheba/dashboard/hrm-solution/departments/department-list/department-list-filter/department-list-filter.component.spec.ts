import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentListFilterComponent } from './department-list-filter.component';

describe('DepartmentListFilterComponent', () => {
  let component: DepartmentListFilterComponent;
  let fixture: ComponentFixture<DepartmentListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentListFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
