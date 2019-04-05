import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetadataViewComponent } from './metadata-view/metadata-view.component';
import { RouterModule } from '@angular/router';
import { FactSheetModule } from '../../fact-sheet/fact-sheet.module';
import { MaterialModule } from '../../../../material.module';
import { TagChipsModule } from '../../tag-chips/tag-chips.module';
import { D3jsModule } from '../../d3js/d3js.module';
import { Project0041Module } from '../../project-specific/project-0041/project-0041.module';

@NgModule({
  imports: [
    CommonModule,
    FactSheetModule,
    MaterialModule,
    TagChipsModule,
    Project0041Module,
    D3jsModule,
    RouterModule.forChild([
      { path: 'dev/metadata', component: MetadataViewComponent }
    ])
  ],
  declarations: [MetadataViewComponent]
})
export class MetadataViewModule { }
