import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqCreateTagsComponent } from './rfq-create-tags.component';

describe('RfqCreateTagsComponent', () => {
  let component: RfqCreateTagsComponent;
  let fixture: ComponentFixture<RfqCreateTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqCreateTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqCreateTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
