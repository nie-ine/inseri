import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResourceFormComponent } from './resource-form/resource-form.component';
import { ResourceValueHistoryComponent } from './resource-value-history/resource-value-history.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [ResourceFormComponent, ResourceValueHistoryComponent ],
  exports: [ResourceFormComponent]
})
export class ResourceFormModule { }
