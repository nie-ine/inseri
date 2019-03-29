import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageFrameOldComponent } from './image-frame-old.component';
import {FormsModule} from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ImageFrameOldComponent', () => {
  let component: ImageFrameOldComponent;
  let fixture: ComponentFixture<ImageFrameOldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ ImageFrameOldComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageFrameOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
