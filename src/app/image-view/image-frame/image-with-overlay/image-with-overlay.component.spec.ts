import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageWithOverlayComponent } from './image-with-overlay.component';

describe('ImageWithOverlayComponent', () => {
  let component: ImageWithOverlayComponent;
  let fixture: ComponentFixture<ImageWithOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageWithOverlayComponent ]
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
