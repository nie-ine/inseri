import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateResourceComponent } from './create-resource/create-resource.component';
import { CreatePropertyComponent } from './create-property/create-property.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [ CreateResourceComponent, CreatePropertyComponent ],
  exports: [ CreateResourceComponent ]
})
export class CreateResourceModule { }
