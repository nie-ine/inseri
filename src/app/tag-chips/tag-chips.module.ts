import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagChipsComponent } from './tag-chips/tag-chips.component';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  declarations: [ TagChipsComponent ],
  exports: [ TagChipsComponent ]
})
export class TagChipsModule { }
