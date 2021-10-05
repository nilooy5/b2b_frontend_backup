import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTemplateSelectSearchComponent } from './form-template-select-search.component';

describe('FormTemplateSelectSearchComponent', () => {
  let component: FormTemplateSelectSearchComponent;
  let fixture: ComponentFixture<FormTemplateSelectSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTemplateSelectSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTemplateSelectSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
