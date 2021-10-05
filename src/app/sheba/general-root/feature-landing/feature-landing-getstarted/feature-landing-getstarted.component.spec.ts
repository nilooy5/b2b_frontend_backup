import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureLandingGetstartedComponent } from './feature-landing-getstarted.component';

describe('FeatureLandingGetstartedComponent', () => {
  let component: FeatureLandingGetstartedComponent;
  let fixture: ComponentFixture<FeatureLandingGetstartedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureLandingGetstartedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureLandingGetstartedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
