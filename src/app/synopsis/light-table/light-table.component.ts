import { Component, ComponentFactoryResolver, ComponentRef, Renderer2, ViewChild } from '@angular/core';
import { SynopsisAnchorDirective } from '../synopsis-anchor.directive';
import { SynopsisItem } from '../synopsis-item';
import { SynopsisTextObjectComponent } from '../synopsis-text-object/synopsis-text-object.component';
import { SynopsisObject } from '../synopsis-object';
import { SynopsisObjectData, SynopsisObjectType } from '../synopsis-object-data';
import { SynopsisImageObjectComponent } from '../synopsis-image-object/synopsis-image-object.component';
import { SynopsisObjectModifierService } from '../synopsis-object-modifier.service';
import {SynopsisObjectSerializerService} from '../synopsis-object-serializer.service';

interface ComponentRefTracker {
  [uid: number]: ComponentRef<SynopsisObject>;
}

@Component({
  selector: 'app-light-table',
  templateUrl: './light-table.component.html',
  styleUrls: ['./light-table.component.scss']
})
export class LightTableComponent {

  @ViewChild(SynopsisAnchorDirective) synopsisObjectsHost: SynopsisAnchorDirective;

  private componentRefTracker: ComponentRefTracker = [];


  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private synopsisObjectModifierService: SynopsisObjectModifierService,
              private synopsisObjectSerializerService: SynopsisObjectSerializerService,
              private renderer: Renderer2) {
    synopsisObjectModifierService.closeObject$.subscribe(uid => this.closeObject(uid));
    synopsisObjectModifierService.resizeObject$.subscribe(obj => this.updateDimensions(obj[0], obj[1], obj[2]));
    synopsisObjectSerializerService.makeLightTableSnapshot$.subscribe(() => this.makeSnapshot());
    synopsisObjectSerializerService.loadLightTableSnapshot$.subscribe(snapshot => this.load(snapshot));
  }

  onDrop(data: SynopsisObjectData) {
    const componentRef = data.uid ? this.componentRefTracker[data.uid] : this.createNewComponentRef(data);
    if (!data.uid) {
      data.uid = +(Math.random().toString().substr(2));
      this.componentRefTracker[data.uid] = componentRef;
    }
    (<SynopsisObject>componentRef.instance).data = data;
  }

  makeSnapshot() {
    const serializedData = Object.keys(this.componentRefTracker).map(key =>
      (<SynopsisObject>this.componentRefTracker[key].instance).data
    );
    this.synopsisObjectSerializerService.sendLightTableSnapshot(serializedData);
  }

  load(snapshot: SynopsisObjectData[]) {
    this.synopsisObjectsHost.viewContainerRef.clear();
    this.componentRefTracker = [];
    for (const obj of snapshot) {
      const componentRef = this.createNewComponentRef(<SynopsisObjectData>obj);
      this.componentRefTracker[obj.uid] = componentRef;
      (<SynopsisObject>componentRef.instance).data = <SynopsisObjectData>obj;
      this.setObjectViewProperty(componentRef, 'width', obj.width + 'px');
      this.setObjectViewProperty(componentRef, 'height', obj.height + 'px');
      this.setObjectViewProperty(componentRef, 'transform', 'rotate(' + obj.transform + 'deg)');
      if (obj.invertedColors) {
        this.renderer.addClass(componentRef.location.nativeElement.querySelector('div'), 'night-view');
      }
    }
  }

  private createNewComponentRef(data: SynopsisObjectData) {
    const synopsisItem = (data.dataType === SynopsisObjectType.Text) ?
      new SynopsisItem(SynopsisTextObjectComponent, data) :
      new SynopsisItem(SynopsisImageObjectComponent, data);
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(synopsisItem.component);
    return this.synopsisObjectsHost.viewContainerRef.createComponent(componentFactory);
  }

  private closeObject(uid: number) {
    this.synopsisObjectsHost.viewContainerRef.remove(this.viewRefIndex(uid));
    this.componentRefTracker[uid] = undefined;
  }

  private viewRefIndex(uid: number): number {
    return this.synopsisObjectsHost.viewContainerRef.indexOf(this.componentRefTracker[uid].hostView);
  }

  private updateDimensions(uid: number, width: number, height: number) {
    (<SynopsisObject>this.componentRefTracker[uid].instance).data.width = width;
    (<SynopsisObject>this.componentRefTracker[uid].instance).data.height = height;
  }

  private setObjectViewProperty(componentRef: ComponentRef<SynopsisObject>, property: string, value: string | number) {
    if ((<SynopsisObject>componentRef.instance).data[property]) {
      this.renderer.setStyle(componentRef.location.nativeElement.querySelector('div'), property, value);
    }
  }

}
