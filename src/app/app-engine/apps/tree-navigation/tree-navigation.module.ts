import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeNavigationComponent } from './navigation-tree/tree-navigation.component';
import { MaterialModule } from '../../../material.module';

@NgModule({
  declarations: [ TreeNavigationComponent ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [ TreeNavigationComponent ]
})
export class TreeNavigationModule { }
