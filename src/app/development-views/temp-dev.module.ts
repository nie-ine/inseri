import { NgModule } from '@angular/core';
import { TextDevViewModule } from './text-dev-view/text-dev-view.module';

@NgModule({
  imports: [
    TextDevViewModule
  ],
  exports: [TextDevViewModule]
})
export class TempDevModule { }
