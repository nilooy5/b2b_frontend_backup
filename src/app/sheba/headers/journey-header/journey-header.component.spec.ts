import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneyHeaderComponent } from './journey-header.component';

describe('JourneyHeaderComponent', () => {
  let component: JourneyHeaderComponent;
  let fixture: ComponentFixture<JourneyHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JourneyHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JourneyHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
