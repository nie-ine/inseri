import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { P0062TranscriptionFrameComponent } from './p0062-transcription-frame.component';

describe('P0062TranscriptionFrameComponent', () => {
  let component: P0062TranscriptionFrameComponent;
  let fixture: ComponentFixture<P0062TranscriptionFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ P0062TranscriptionFrameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(P0062TranscriptionFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
