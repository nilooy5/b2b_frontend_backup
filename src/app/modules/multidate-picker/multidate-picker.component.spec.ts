import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultidatePickerComponent } from './multidate-picker.component';

describe('MultidatePickerComponent', () => {
  let component: MultidatePickerComponent;
  let fixture: ComponentFixture<MultidatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultidatePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultidatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
