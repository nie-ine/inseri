import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoinedTextViewComponent } from './joined-text-view/joined-text-view.component';
import { JoinedTextBlockComponent } from './joined-text-block/joined-text-block.component';
import { JoinedTextLineComponent } from './joined-text-line/joined-text-line.component';
import { JoinedTextLinepartComponent } from './joined-text-linepart/joined-text-linepart.component';
import { JoinedTextMarginComponent } from './joined-text-margin/joined-text-margin.component';
import { RichTextModule } from '../shared/rich-text/rich-text.module';
import { JoinedTextTextwrapperComponent } from './joined-text-textwrapper/joined-text-textwrapper.component';

@NgModule({
  declarations: [
    JoinedTextViewComponent,
    JoinedTextBlockComponent,
    JoinedTextLineComponent,
    JoinedTextLinepartComponent,
    JoinedTextMarginComponent,
    JoinedTextTextwrapperComponent  ],
  imports: [
    CommonModule,
    RichTextModule
  ],
  exports: [JoinedTextViewComponent]
})
export class JoinedTextViewModule { }
