import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FactSheetComponent } from './fact-sheet/fact-sheet.component';
import { RouterModule } from '@angular/router';
import { BaseTypeFormsModule } from '../base-type-forms/base-type-forms.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BaseTypeFormsModule
  ],
  declarations: [FactSheetComponent],
  exports: [FactSheetComponent]
})
export class FactSheetModule { }
