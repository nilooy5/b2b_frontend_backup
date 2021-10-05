import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderListPaginationComponent } from './tender-list-pagination.component';

describe('TenderListPaginationComponent', () => {
  let component: TenderListPaginationComponent;
  let fixture: ComponentFixture<TenderListPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderListPaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderListPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
