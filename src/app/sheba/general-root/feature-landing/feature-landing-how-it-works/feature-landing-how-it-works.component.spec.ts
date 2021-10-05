import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureLandingHowItWorksComponent } from './feature-landing-how-it-works.component';

describe('FeatureLandingHowItWorksComponent', () => {
  let component: FeatureLandingHowItWorksComponent;
  let fixture: ComponentFixture<FeatureLandingHowItWorksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureLandingHowItWorksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureLandingHowItWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
