import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { YoutubeVideoComponent } from './youtube-video.component';

describe('YoutubeVideoComponent', () => {
  let component: YoutubeVideoComponent;
  let fixture: ComponentFixture<YoutubeVideoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ YoutubeVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubeVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
