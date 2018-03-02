import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageFrameComponent } from './image-frame.component';
import {FormsModule} from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ImageFrameComponent', () => {
  let component: ImageFrameComponent;
  let fixture: ComponentFixture<ImageFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ ImageFrameComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
