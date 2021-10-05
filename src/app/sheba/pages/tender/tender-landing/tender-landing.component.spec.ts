import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderLandingComponent } from './tender-landing.component';

describe('TenderLandingComponent', () => {
  let component: TenderLandingComponent;
  let fixture: ComponentFixture<TenderLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
