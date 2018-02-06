import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageFrameSizesComponent } from './image-frame-sizes.component';
import {ImageFrameComponent} from '../image-frame/image-frame.component';
import {FormsModule} from '@angular/forms';

describe('ImageFrameSizesComponent', () => {
  let component: ImageFrameSizesComponent;
  let fixture: ComponentFixture<ImageFrameSizesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        ImageFrameSizesComponent,
        ImageFrameComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageFrameSizesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change its size to large', () => {
    component.radioChange('large');
    expect(component.viewerWidth).toBe(900);
  });

  it('should change its size to normal', () => {
    component.radioChange('normal');
    expect(component.viewerWidth).toBe(600);
  });

  it('should change its size to small', () => {
    component.radioChange('small');
    expect(component.viewerWidth).toBe(300);
  });
});
