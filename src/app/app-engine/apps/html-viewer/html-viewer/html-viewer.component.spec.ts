import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HtmlViewerComponent } from './html-viewer.component';

describe('HtmlViewerComponent', () => {
  let component: HtmlViewerComponent;
  let fixture: ComponentFixture<HtmlViewerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HtmlViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtmlViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
