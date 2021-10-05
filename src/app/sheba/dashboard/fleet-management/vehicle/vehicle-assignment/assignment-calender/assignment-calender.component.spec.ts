import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentCalenderComponent } from './assignment-calender.component';

describe('AssignmentCalenderComponent', () => {
  let component: AssignmentCalenderComponent;
  let fixture: ComponentFixture<AssignmentCalenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentCalenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
