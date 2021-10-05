import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentAddRoleModalComponent } from './department-add-role-modal.component';

describe('DepartmentAddRoleModalComponent', () => {
  let component: DepartmentAddRoleModalComponent;
  let fixture: ComponentFixture<DepartmentAddRoleModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentAddRoleModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentAddRoleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
