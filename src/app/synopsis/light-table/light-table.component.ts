import {Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild} from '@angular/core';
import {SynopsisAnchorDirective} from '../synopsis-anchor.directive';
import {SynopsisItem} from '../synopsis-item';
import {SynopsisTextObjectComponent} from '../synopsis-text-object/synopsis-text-object.component';
import {SynopsisObject} from '../synopsis-object';
import {SynopsisObjectData, SynopsisObjectType} from '../synopsis-object-data';
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
    const synopsisItem = (data.dataType === SynopsisObjectType.Text) ?
      new SynopsisItem(SynopsisTextObjectComponent, data) :
      new SynopsisItem(SynopsisImageObjectComponent, data);
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(synopsisItem.component);
    let componentRef: ComponentRef<SynopsisObject>;
    if (data.viewRefIndex >= 0) {
      this.synopsisObjectsHost.viewContainerRef.remove(data.viewRefIndex);
      componentRef = this.synopsisObjectsHost.viewContainerRef.createComponent(componentFactory, data.viewRefIndex);
    } else {
      const viewRefIndex = this.synopsisObjectsHost.viewContainerRef.length;
      componentRef = this.synopsisObjectsHost.viewContainerRef.createComponent(componentFactory, viewRefIndex);
      data.viewRefIndex = viewRefIndex;
    }
    (<SynopsisObject>componentRef.instance).data = synopsisItem.data;
  }

}
