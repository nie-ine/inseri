import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import { CreateResourceModule } from '../../nie-OS-apps/create-resource/create-resource.module';
import { CreateResourceViewComponent } from './create-resource-view/create-resource-view.component';


@NgModule({
  imports: [
    CommonModule,
    CreateResourceModule,
    RouterModule.forChild([
      { path: 'dev/create-resource', component: CreateResourceViewComponent }
    ])
  ],
  declarations: [CreateResourceViewComponent],
  exports: [ CreateResourceViewComponent ]
})
export class CreateResourceViewModule { }
