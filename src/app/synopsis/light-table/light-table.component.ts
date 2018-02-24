import {Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild} from '@angular/core';
import {SynopsisAnchorDirective} from '../synopsis-anchor.directive';
import {SynopsisItem} from '../synopsis-item';
import {SynopsisTextObjectComponent} from '../synopsis-text-object/synopsis-text-object.component';
import {SynopsisObject} from '../synopsis-object';
import {SynopsisObjectData, SynopsisObjectType} from '../synopsis-object-data';
import {SynopsisImageObjectComponent} from '../synopsis-image-object/synopsis-image-object.component';
import {SynopsisObjectModifierService} from '../synopsis-object-modifier.service';

interface ComponentRefTracker {
  [uid: number]: ComponentRef<SynopsisObject>;
}

@Component({
  selector: 'app-light-table',
  templateUrl: './light-table.component.html',
  styleUrls: ['./light-table.component.scss']
})
export class LightTableComponent implements OnInit {

  @ViewChild(SynopsisAnchorDirective) synopsisObjectsHost: SynopsisAnchorDirective;

  private componentRefTracker: ComponentRefTracker = [];


  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private synopsisObjectModifierService: SynopsisObjectModifierService) {
    synopsisObjectModifierService.closeObject$.subscribe(uid => this.closeObject(uid));
  }

  ngOnInit() {

  }

  onDrop(data: SynopsisObjectData) {
    const synopsisItem = (data.dataType === SynopsisObjectType.Text) ?
      new SynopsisItem(SynopsisTextObjectComponent, data) :
      new SynopsisItem(SynopsisImageObjectComponent, data);
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(synopsisItem.component);
    let componentRef: ComponentRef<SynopsisObject>;
    if (data.uid) {
      this.synopsisObjectsHost.viewContainerRef.remove(this.viewRefIndex(data.uid));
      componentRef = this.synopsisObjectsHost.viewContainerRef.createComponent(componentFactory);
      this.componentRefTracker[data.uid] = componentRef;
    } else {
      data.uid = +(Math.random().toString().substr(2));
      componentRef = this.synopsisObjectsHost.viewContainerRef.createComponent(componentFactory);
      this.componentRefTracker[data.uid] = componentRef;
    }
    (<SynopsisObject>componentRef.instance).data = data;
  }

  closeObject(uid: number) {
    this.synopsisObjectsHost.viewContainerRef.remove(this.viewRefIndex(uid));
    this.componentRefTracker[uid] = undefined;
  }

  private viewRefIndex(uid: number): number {
    return this.synopsisObjectsHost.viewContainerRef.indexOf(this.componentRefTracker[uid].hostView);
  }

}
