import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { P0062TranscriptionComponent } from './p0062-transcription/p0062-transcription.component';
import { P0062TranscriptionFrameComponent } from './p0062-transcription-frame/p0062-transcription-frame.component';

@NgModule({
  declarations: [P0062TranscriptionComponent, P0062TranscriptionFrameComponent],
  imports: [
    CommonModule
  ],
  exports: [P0062TranscriptionFrameComponent]
})
export class Project0062Module { }
