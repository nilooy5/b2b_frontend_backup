import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoWorkersListComponent } from './co-workers-list.component';

describe('CoWorkersListComponent', () => {
  let component: CoWorkersListComponent;
  let fixture: ComponentFixture<CoWorkersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoWorkersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoWorkersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
