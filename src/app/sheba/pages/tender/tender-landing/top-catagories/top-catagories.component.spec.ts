import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopCatagoriesComponent } from './top-catagories.component';

describe('TopCatagoriesComponent', () => {
  let component: TopCatagoriesComponent;
  let fixture: ComponentFixture<TopCatagoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopCatagoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopCatagoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
