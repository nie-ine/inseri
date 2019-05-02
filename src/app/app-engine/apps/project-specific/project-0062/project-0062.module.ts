import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { P0062TranscriptionFrameComponent } from './p0062-transcription-frame/p0062-transcription-frame.component';
import { RichTextModule } from '../../shared/rich-text/rich-text.module';

@NgModule({
  declarations: [ P0062TranscriptionFrameComponent],
  imports: [
    CommonModule,
    RichTextModule
  ],
  exports: [P0062TranscriptionFrameComponent]
})
export class Project0062Module { }
