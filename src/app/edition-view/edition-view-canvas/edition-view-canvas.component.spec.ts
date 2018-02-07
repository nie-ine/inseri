import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditionViewCanvasComponent} from './edition-view-canvas.component';
import {By} from '@angular/platform-browser';

describe('EditionViewCanvasComponent', () => {
  let component: EditionViewCanvasComponent;
  let fixture: ComponentFixture<EditionViewCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditionViewCanvasComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditionViewCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
