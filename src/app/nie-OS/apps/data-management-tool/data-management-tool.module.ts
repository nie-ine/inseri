import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataChooserComponent } from './data-chooser/data-chooser.component';
import {RouterModule} from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { DataChooserSettingsComponent } from './data-chooser-settings/data-chooser-settings.component';
import {MatDialogModule} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    RouterModule.forChild([
      { path: 'data-chooser', component: DataChooserComponent }
    ])
  ],
  declarations: [
    DataChooserComponent,
    DataChooserSettingsComponent
  ],
  exports: [
    DataChooserComponent
  ],
  entryComponents: [
    DataChooserSettingsComponent
  ]
})
export class DataManagementToolModule { }
