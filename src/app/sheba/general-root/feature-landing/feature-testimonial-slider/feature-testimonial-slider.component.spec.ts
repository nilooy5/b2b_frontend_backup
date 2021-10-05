import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureTestimonialSliderComponent } from './feature-testimonial-slider.component';

describe('FeatureTestimonialSliderComponent', () => {
  let component: FeatureTestimonialSliderComponent;
  let fixture: ComponentFixture<FeatureTestimonialSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureTestimonialSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureTestimonialSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
