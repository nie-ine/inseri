import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CanvasWhiteboardComponent } from './canvas-whiteboard.component';

describe('CanvasWhiteboardComponent', () => {
  let component: CanvasWhiteboardComponent;
  let fixture: ComponentFixture<CanvasWhiteboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasWhiteboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasWhiteboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
