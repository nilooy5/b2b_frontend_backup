import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigigoTestimonialSliderComponent } from './digigo-testimonial-slider.component';

describe('DigigoTestimonialSliderComponent', () => {
  let component: DigigoTestimonialSliderComponent;
  let fixture: ComponentFixture<DigigoTestimonialSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigigoTestimonialSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigigoTestimonialSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
