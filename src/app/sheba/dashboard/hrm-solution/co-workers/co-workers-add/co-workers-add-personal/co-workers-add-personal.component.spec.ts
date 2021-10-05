import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoWorkersAddPersonalComponent } from './co-workers-add-personal.component';

describe('CoWorkersAddPersonalComponent', () => {
  let component: CoWorkersAddPersonalComponent;
  let fixture: ComponentFixture<CoWorkersAddPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoWorkersAddPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoWorkersAddPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
