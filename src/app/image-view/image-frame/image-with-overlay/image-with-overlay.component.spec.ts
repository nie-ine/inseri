import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageWithOverlayComponent } from './image-with-overlay.component';
import { RegionToSvgService } from '../../region-to-svg.service';
import { By } from '@angular/platform-browser';

declare let OpenSeadragon: any;

describe('ImageWithOverlayComponent', () => {
  let component: ImageWithOverlayComponent;
  let fixture: ComponentFixture<ImageWithOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageWithOverlayComponent ],
      providers: [ RegionToSvgService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageWithOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
