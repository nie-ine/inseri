import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseTypeFormsModule } from '../base-type-forms/base-type-forms.module';
import { ResourceFormComponent } from './resource-form/resource-form.component';
import { ResourceValueHistoryComponent } from './resource-value-history/resource-value-history.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BaseTypeFormsModule
  ],
  declarations: [ResourceFormComponent, ResourceValueHistoryComponent ],
  exports: [ResourceFormComponent]
})
export class ResourceFormModule { }
