import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';
import { ResourceFormModule } from '../../resource-form/resource-form.module';
import { EditResourceViewComponent } from './edit-resource-view/edit-resource-view.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ResourceFormModule,
    RouterModule.forChild([
      { path: 'dev/edit-resource', component: EditResourceViewComponent }
    ])
  ],
  declarations: [EditResourceViewComponent],
  exports: [EditResourceViewComponent]
})
export class EditResourceViewModule { }
