import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationTreeComponent } from './navigation-tree/navigation-tree.component';
import { MaterialModule } from '../../../material.module';

@NgModule({
  declarations: [ NavigationTreeComponent ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [ NavigationTreeComponent ]
})
export class NavigationModule { }
