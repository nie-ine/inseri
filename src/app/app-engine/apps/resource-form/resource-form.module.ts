import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseTypeFormsModule } from '../shared/base-type-forms/base-type-forms.module';
import { ResourceFormComponent } from './resource-form/resource-form.component';
import { ResourceValueHistoryComponent } from './resource-value-history/resource-value-history.component';
import { ResourceValueHistoryValueComponent } from './resource-value-history-value/resource-value-history-value.component';
import { KnoraV1RequestService } from '../../../query-engine/knora/knora-v1-request.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BaseTypeFormsModule
  ],
  declarations: [
    ResourceFormComponent,
    ResourceValueHistoryComponent,
    ResourceValueHistoryValueComponent
  ],
  exports: [ResourceFormComponent],
  providers: [ KnoraV1RequestService ]
})
export class ResourceFormModule { }
