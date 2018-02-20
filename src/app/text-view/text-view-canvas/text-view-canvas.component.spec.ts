import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TextViewCanvasComponent} from './text-view-canvas.component';
import {By} from '@angular/platform-browser';

describe('TextViewCanvasComponent', () => {
  let component: TextViewCanvasComponent;
  let fixture: ComponentFixture<TextViewCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TextViewCanvasComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextViewCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
