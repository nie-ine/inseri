import {Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {SynopsisAnchorDirective} from '../synopsis-anchor.directive';
import {SynopsisItem} from '../synopsis-item';
import {SynopsisTextObjectComponent} from '../synopsis-text-object/synopsis-text-object.component';
import {SynopsisObject} from '../synopsis-object';
import {SynopsisObjectData} from '../synopsis-object-data';
import {SynopsisImageObjectComponent} from '../synopsis-image-object/synopsis-image-object.component';

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

  onDrop(data: SynopsisObjectData) {
    const synopsisItem = (data.dataType === 'text') ?
      new SynopsisItem(SynopsisTextObjectComponent, data) :
      new SynopsisItem(SynopsisImageObjectComponent, data);
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(synopsisItem.component);
    const componentRef = this.synopsisObjectsHost.viewContainerRef.createComponent(componentFactory);
    (<SynopsisObject>componentRef.instance).data = synopsisItem.data;
  }

}
