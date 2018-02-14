import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FactSheetComponent } from './fact-sheet/fact-sheet.component';
import { IndirectEntryComponent } from './indirect-entry/indirect-entry.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FactSheetComponent, IndirectEntryComponent],
  exports: [FactSheetComponent]
})
export class FactSheetModule { }
