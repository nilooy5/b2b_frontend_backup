import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesVideoOverviewComponent } from './services-video-overview.component';

describe('ServicesVideoOverviewComponent', () => {
  let component: ServicesVideoOverviewComponent;
  let fixture: ComponentFixture<ServicesVideoOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesVideoOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesVideoOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
