import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoWorkersAddComponent } from './co-workers-add.component';

describe('CoWorkersAddComponent', () => {
  let component: CoWorkersAddComponent;
  let fixture: ComponentFixture<CoWorkersAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoWorkersAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoWorkersAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
