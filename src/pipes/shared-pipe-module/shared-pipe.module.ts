import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LinkifyPipe} from './style-pipes';

@NgModule({
  declarations: [
    LinkifyPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LinkifyPipe
  ]
})
export class SharedPipeModule {}

