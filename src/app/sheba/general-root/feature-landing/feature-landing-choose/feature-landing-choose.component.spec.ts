import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureLandingChooseComponent } from './feature-landing-choose.component';

describe('FeatureLandingChooseComponent', () => {
  let component: FeatureLandingChooseComponent;
  let fixture: ComponentFixture<FeatureLandingChooseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureLandingChooseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureLandingChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
