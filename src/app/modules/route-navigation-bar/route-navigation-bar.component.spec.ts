import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteNavigationBarComponent } from './route-navigation-bar.component';

describe('RouteNavigationBarComponent', () => {
  let component: RouteNavigationBarComponent;
  let fixture: ComponentFixture<RouteNavigationBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteNavigationBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteNavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
