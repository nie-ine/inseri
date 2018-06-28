import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResourceFormComponent } from './resource-form/resource-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [ResourceFormComponent],
  exports: [ResourceFormComponent]
})
export class ResourceFormModule { }
