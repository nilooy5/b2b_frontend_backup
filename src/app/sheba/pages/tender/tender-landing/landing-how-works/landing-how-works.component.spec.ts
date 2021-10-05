import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingHowWorksComponent } from './landing-how-works.component';

describe('LandingHowWorksComponent', () => {
  let component: LandingHowWorksComponent;
  let fixture: ComponentFixture<LandingHowWorksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingHowWorksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingHowWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
