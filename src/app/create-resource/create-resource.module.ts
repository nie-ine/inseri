import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseTypeFormsModule } from '../base-type-forms/base-type-forms.module';
import { CreateResourceComponent } from './create-resource/create-resource.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BaseTypeFormsModule
  ],
  declarations: [ CreateResourceComponent ],
  exports: [ CreateResourceComponent ]
})
export class CreateResourceModule { }
