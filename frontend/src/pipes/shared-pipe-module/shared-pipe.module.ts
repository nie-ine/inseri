import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LinkifyPipe, PrettyPrintPipe} from './style-pipes';

@NgModule({
  declarations: [
    LinkifyPipe,
    PrettyPrintPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LinkifyPipe,
    PrettyPrintPipe
  ]
})
export class SharedPipeModule {}

