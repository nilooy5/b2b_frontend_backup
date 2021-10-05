import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderListBannerComponent } from './tender-list-banner.component';

describe('TenderListBannerComponent', () => {
  let component: TenderListBannerComponent;
  let fixture: ComponentFixture<TenderListBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderListBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderListBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
