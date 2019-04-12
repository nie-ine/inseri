import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { P0062TranscriptionComponent } from './p0062-transcription.component';

describe('P0062TranscriptionComponent', () => {
  let component: P0062TranscriptionComponent;
  let fixture: ComponentFixture<P0062TranscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ P0062TranscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(P0062TranscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
