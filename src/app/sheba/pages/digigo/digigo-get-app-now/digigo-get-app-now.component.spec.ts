import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigigoGetAppNowComponent } from './digigo-get-app-now.component';

describe('DigigoGetAppNowComponent', () => {
  let component: DigigoGetAppNowComponent;
  let fixture: ComponentFixture<DigigoGetAppNowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigigoGetAppNowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigigoGetAppNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
