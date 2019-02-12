import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpaTextComponent } from './spa-text/spa-text.component';

/**
 * This module connects the components for positional semantic annotation functionality.
 */
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SpaTextComponent],
  exports: [SpaTextComponent]
})
export class SpaTextModule { }
