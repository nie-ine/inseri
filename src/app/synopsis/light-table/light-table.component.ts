import {Component, ComponentFactoryResolver, Input, OnInit, ViewChild} from '@angular/core';
import {SynopsisObjectComponent} from '../synopsis-object/synopsis-object.component';
import {SynopsisAnchorDirective} from '../synopsis-anchor.directive';

@Component({
  selector: 'app-light-table',
  templateUrl: './light-table.component.html',
  styleUrls: ['./light-table.component.scss']
})
export class LightTableComponent implements OnInit {

  synopsisObjects: SynopsisObjectComponent[] = [];
  @ViewChild(SynopsisAnchorDirective) synopsisObjectsHost: SynopsisAnchorDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit() {

  }

  onDrop(data: any) {
    const synopsisObject = new SynopsisObjectComponent();
    this.synopsisObjects.push(synopsisObject);
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(synopsisObject.component);
    const viewContainerRef = this.synopsisObjectsHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<SynopsisObjectComponent>componentRef.instance).data = synopsisObject.data;
    console.log(this.synopsisObjects);
  }

}
