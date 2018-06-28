import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FactSheetComponent } from './fact-sheet/fact-sheet.component';
import { IndirectEntryComponent } from './indirect-entry/indirect-entry.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  declarations: [FactSheetComponent, IndirectEntryComponent],
  exports: [FactSheetComponent]
})
export class FactSheetModule { }
