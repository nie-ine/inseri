import {Component, ComponentFactoryResolver, Input, OnInit, ViewChild} from '@angular/core';
import {SynopsisAnchorDirective} from '../synopsis-anchor.directive';
import {SynopsisItem} from '../synopsis-item';
import {SynopsisTextObjectComponent} from '../synopsis-text-object/synopsis-text-object.component';
import {SynopsisDataObject} from '../synopsis-data-object';

@Component({
  selector: 'app-light-table',
  templateUrl: './light-table.component.html',
  styleUrls: ['./light-table.component.scss']
})
export class LightTableComponent implements OnInit {

  @ViewChild(SynopsisAnchorDirective) synopsisObjectsHost: SynopsisAnchorDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit() {

  }

  onDrop(data: any) {
    const synopsisItem = new SynopsisItem(SynopsisTextObjectComponent, 'awefwaefawfawef awef awef wef');
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(synopsisItem.component);
    const viewContainerRef = this.synopsisObjectsHost.viewContainerRef;
    // viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<SynopsisDataObject>componentRef.instance).data = synopsisItem.data;
  }

}
