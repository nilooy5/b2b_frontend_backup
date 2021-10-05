import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderLandingCoverComponent } from './tender-landing-cover.component';

describe('TenderLandingCoverComponent', () => {
  let component: TenderLandingCoverComponent;
  let fixture: ComponentFixture<TenderLandingCoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderLandingCoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderLandingCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
