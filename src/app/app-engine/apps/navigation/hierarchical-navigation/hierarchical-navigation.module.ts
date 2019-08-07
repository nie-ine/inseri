import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HierarchicalNavigationViewComponent } from './hierarchical-navigation-view/hierarchical-navigation-view.component';
import { HierarchicalNavigationNodeComponent } from './hierarchical-navigation-node/hierarchical-navigation-node.component';
import { HierarchicalNavigationRootComponent } from './hierarchical-navigation-root/hierarchical-navigation-root.component';

@NgModule({
  declarations: [HierarchicalNavigationViewComponent, HierarchicalNavigationNodeComponent, HierarchicalNavigationRootComponent],
  imports: [
    CommonModule
  ],
  exports: [HierarchicalNavigationViewComponent]
})
export class HierarchicalNavigationModule { }
