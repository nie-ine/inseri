import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetadataViewComponent } from './metadata-view/metadata-view.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { TagChipsModule } from './tag-chips/tag-chips.module';
import { ArithmeticModule } from 'nie-ine/dist/src/modules/arithmetic.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ArithmeticModule,
    TagChipsModule,
    RouterModule.forChild([
      { path: 'metadata', component: MetadataViewComponent }
    ])
  ],
  declarations: [MetadataViewComponent]
})
export class MetadataViewModule { }
