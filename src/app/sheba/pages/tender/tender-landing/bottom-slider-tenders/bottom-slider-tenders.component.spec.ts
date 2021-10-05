import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSliderTendersComponent } from './bottom-slider-tenders.component';

describe('BottomSliderTendersComponent', () => {
  let component: BottomSliderTendersComponent;
  let fixture: ComponentFixture<BottomSliderTendersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomSliderTendersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomSliderTendersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
