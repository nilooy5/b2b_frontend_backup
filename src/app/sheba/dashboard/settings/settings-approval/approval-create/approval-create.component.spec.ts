import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalCreateComponent } from './approval-create.component';

describe('ApprovalCreateComponent', () => {
  let component: ApprovalCreateComponent;
  let fixture: ComponentFixture<ApprovalCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
