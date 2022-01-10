import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HtmlViewerInnerhtmlComponent } from './html-viewer-innerhtml.component';

describe('HtmlViewerInnerhtmlComponent', () => {
  let component: HtmlViewerInnerhtmlComponent;
  let fixture: ComponentFixture<HtmlViewerInnerhtmlComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HtmlViewerInnerhtmlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtmlViewerInnerhtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
