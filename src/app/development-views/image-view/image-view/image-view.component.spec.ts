import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageViewComponent } from './image-view.component';
import { ImageFrameModule } from '../../../image-frame/image-frame.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RegionToSvgService } from '../../../image-frame/region-to-svg.service';
import { By } from '@angular/platform-browser';

describe('ImageViewComponent', () => {
  let component: ImageViewComponent;
  let fixture: ComponentFixture<ImageViewComponent>;

  let imageFrameSizes: any[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ImageFrameModule ],
      declarations: [ ImageViewComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [ RegionToSvgService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    imageFrameSizes = fixture.debugElement.queryAll(By.css('app-image-frame-sizes'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain child component app-image-frame-sizes', () => {
    for (let i = 0; i < imageFrameSizes.length; i++) {
      expect(imageFrameSizes[i].nativeElement).toBeDefined();
    }
  });
});
