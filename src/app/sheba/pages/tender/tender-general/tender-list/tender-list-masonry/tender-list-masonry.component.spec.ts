import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderListMasonryComponent } from './tender-list-masonry.component';

describe('TenderListMasonryComponent', () => {
  let component: TenderListMasonryComponent;
  let fixture: ComponentFixture<TenderListMasonryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderListMasonryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderListMasonryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
