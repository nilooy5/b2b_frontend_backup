import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoWorkersDetailsPersonalComponent } from './co-workers-details-personal.component';

describe('CoWorkersDetailsPersonalComponent', () => {
  let component: CoWorkersDetailsPersonalComponent;
  let fixture: ComponentFixture<CoWorkersDetailsPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoWorkersDetailsPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoWorkersDetailsPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
