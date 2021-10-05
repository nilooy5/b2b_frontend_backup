import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderDatePickerComponent } from './slider-date-picker.component';

describe('SliderDatePickerComponent', () => {
  let component: SliderDatePickerComponent;
  let fixture: ComponentFixture<SliderDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderDatePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
