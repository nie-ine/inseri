import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseTypeFormsModule } from '../shared/base-type-forms/base-type-forms.module';
import { ResourceValueHistoryComponent } from './resource-value-history/resource-value-history.component';
import { ResourceValueHistoryValueComponent } from './resource-value-history-value/resource-value-history-value.component';
import { KnoraV1RequestService } from '../../../query-engine/knora/knora-v1-request.service';
import { ResourceFormV2Component } from './resource-form-v2/resource-form-v2.component';
import { RichTextModule } from '../shared/rich-text/rich-text.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BaseTypeFormsModule,
    RichTextModule
  ],
  declarations: [
    ResourceValueHistoryComponent,
    ResourceValueHistoryValueComponent,
    ResourceFormV2Component
  ],
  exports: [ResourceFormV2Component],
  providers: [ KnoraV1RequestService ]
})
export class ResourceFormModule { }
