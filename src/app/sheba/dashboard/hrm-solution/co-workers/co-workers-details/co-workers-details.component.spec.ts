import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoWorkersDetailsComponent } from './co-workers-details.component';

describe('CoWorkersDetailsComponent', () => {
  let component: CoWorkersDetailsComponent;
  let fixture: ComponentFixture<CoWorkersDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoWorkersDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoWorkersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
