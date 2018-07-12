import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataChooserComponent } from './data-chooser/data-chooser.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DataChooserComponent
  ],
  exports: [
    DataChooserComponent
  ]
})
export class DataManagementToolModule { }
