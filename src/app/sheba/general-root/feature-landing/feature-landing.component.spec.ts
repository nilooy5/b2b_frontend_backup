import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureLandingComponent } from './feature-landing.component';

describe('FeatureLandingComponent', () => {
  let component: FeatureLandingComponent;
  let fixture: ComponentFixture<FeatureLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
