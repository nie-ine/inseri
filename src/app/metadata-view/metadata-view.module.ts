import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetadataViewComponent } from './metadata-view/metadata-view.component';
import { RouterModule } from '@angular/router';
import { FactSheetModule } from './fact-sheet/fact-sheet.module';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    FactSheetModule,
    MaterialModule,
    RouterModule.forChild([
      { path: 'metadata', component: MetadataViewComponent }
    ])
  ],
  declarations: [MetadataViewComponent]
})
export class MetadataViewModule { }
