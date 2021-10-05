import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsContentComponent } from './notifications-content.component';

describe('NotificationsContentComponent', () => {
  let component: NotificationsContentComponent;
  let fixture: ComponentFixture<NotificationsContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationsContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
