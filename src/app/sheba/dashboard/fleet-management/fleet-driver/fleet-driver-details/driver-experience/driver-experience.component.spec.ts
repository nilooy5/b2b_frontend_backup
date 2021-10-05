import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverExperienceComponent } from './driver-experience.component';

describe('DriverExperienceComponent', () => {
  let component: DriverExperienceComponent;
  let fixture: ComponentFixture<DriverExperienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverExperienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
