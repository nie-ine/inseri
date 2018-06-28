import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceFormComponent } from './resource-form/resource-form.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ResourceFormComponent],
  exports: [ResourceFormComponent]
})
export class ResourceFormModule { }
