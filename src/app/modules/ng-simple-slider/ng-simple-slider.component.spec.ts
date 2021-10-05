import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgSimpleSliderComponent } from './ng-simple-slider.component';

describe('NgSimpleSliderComponent', () => {
  let component: NgSimpleSliderComponent;
  let fixture: ComponentFixture<NgSimpleSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgSimpleSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgSimpleSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
