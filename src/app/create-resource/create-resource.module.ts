import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseTypeFormsModule } from '../base-type-forms/base-type-forms.module';
import { CreateResourceComponent } from './create-resource/create-resource.component';
import { KnoraV1RequestService } from '../shared/knora-v1-request.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BaseTypeFormsModule
  ],
  declarations: [ CreateResourceComponent ],
  exports: [ CreateResourceComponent ],
  providers: [ KnoraV1RequestService ]
})
export class CreateResourceModule { }
