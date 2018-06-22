import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateResourceComponent } from './create-resource/create-resource.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [ CreateResourceComponent ],
  exports: [ CreateResourceComponent ]
})
export class CreateResourceModule { }
