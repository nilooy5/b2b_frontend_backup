import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureLandingSliderComponent } from './feature-landing-slider.component';

describe('FeatureLandingSliderComponent', () => {
  let component: FeatureLandingSliderComponent;
  let fixture: ComponentFixture<FeatureLandingSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureLandingSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureLandingSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
