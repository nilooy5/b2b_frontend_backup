import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadDragComponent } from './file-upload-drag.component';

describe('FileUploadDragComponent', () => {
  let component: FileUploadDragComponent;
  let fixture: ComponentFixture<FileUploadDragComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileUploadDragComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadDragComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
