import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigigoMainFeaturesComponent } from './digigo-main-features.component';

describe('DigigoMainFeaturesComponent', () => {
  let component: DigigoMainFeaturesComponent;
  let fixture: ComponentFixture<DigigoMainFeaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigigoMainFeaturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigigoMainFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
