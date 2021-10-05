import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureLandingHeroComponent } from './feature-landing-hero.component';

describe('FeatureLandingHeroComponent', () => {
  let component: FeatureLandingHeroComponent;
  let fixture: ComponentFixture<FeatureLandingHeroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureLandingHeroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureLandingHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
