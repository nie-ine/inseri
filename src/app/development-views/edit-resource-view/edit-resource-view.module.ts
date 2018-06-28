import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import { ResourceFormModule } from '../../resource-form/resource-form.module';
import { EditResourceViewComponent } from './edit-resource-view/edit-resource-view.component';

@NgModule({
  imports: [
    CommonModule,
    ResourceFormModule,
    RouterModule.forChild([
      { path: 'edit-resource', component: EditResourceViewComponent }
    ])
  ],
  declarations: [EditResourceViewComponent],
  exports: [EditResourceViewComponent]
})
export class EditResourceViewModule { }
