import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureLandingAdditionalServicesComponent } from './feature-landing-additional-services.component';

describe('FeatureLandingAdditionalServicesComponent', () => {
  let component: FeatureLandingAdditionalServicesComponent;
  let fixture: ComponentFixture<FeatureLandingAdditionalServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureLandingAdditionalServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureLandingAdditionalServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
