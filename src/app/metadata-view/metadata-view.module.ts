import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetadataViewComponent } from './metadata-view/metadata-view.component';
import { RouterModule } from '@angular/router';
import { TagChipsModule } from './tag-chips/tag-chips.module';

@NgModule({
  imports: [
    CommonModule,
    TagChipsModule,
    RouterModule.forChild([
      { path: 'metadata', component: MetadataViewComponent }
    ])
  ],
  declarations: [MetadataViewComponent]
})
export class MetadataViewModule { }
