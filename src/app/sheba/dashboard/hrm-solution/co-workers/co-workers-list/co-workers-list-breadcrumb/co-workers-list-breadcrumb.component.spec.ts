import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoWorkersListBreadcrumbComponent } from './co-workers-list-breadcrumb.component';

describe('CoWorkersListBreadcrumbComponent', () => {
  let component: CoWorkersListBreadcrumbComponent;
  let fixture: ComponentFixture<CoWorkersListBreadcrumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoWorkersListBreadcrumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoWorkersListBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
