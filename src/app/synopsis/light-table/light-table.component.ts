import { Component, ComponentFactoryResolver, ComponentRef, Renderer2, ViewChild } from '@angular/core';
import { SynopsisAnchorDirective } from '../synopsis-anchor.directive';
import { SynopsisItem } from '../synopsis-item';
import { SynopsisTextObjectComponent } from '../synopsis-text-object/synopsis-text-object.component';
import { SynopsisObject } from '../synopsis-object';
import { SynopsisObjectData, SynopsisObjectType } from '../synopsis-object-data';
import { SynopsisImageObjectComponent } from '../synopsis-image-object/synopsis-image-object.component';
import { SynopsisObjectModifierService } from '../synopsis-object-modifier.service';

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
              private renderer: Renderer2) {
    synopsisObjectModifierService.closeObject$.subscribe(uid => this.closeObject(uid));
    synopsisObjectModifierService.resizeObject$.subscribe(obj => this.updateDimensions(obj[0], obj[1], obj[2]));
  }

  onDrop(data: SynopsisObjectData) {
    const componentRef = data.uid ? this.componentRefTracker[data.uid] : this.createNewComponentRef(data);
    if (!data.uid) {
      data.uid = +(Math.random().toString().substr(2));
      this.componentRefTracker[data.uid] = componentRef;
    }
    (<SynopsisObject>componentRef.instance).data = data;
  }

  save() {
    const serializedData = Object.keys(this.componentRefTracker).map(key =>
      (<SynopsisObject>this.componentRefTracker[key].instance).data
    );
    console.log(serializedData);
  }

  load() {
    const testObj = [
      {
        dataType: 1,
        height: 277,
        id: '9',
        left: 312,
        name: 'Mountains',
        src: '../../../assets/img/about/4.jpg',
        top: 232,
        uid: 5005053034081766,
        width: 242.65625,
        transform: 90,
        invertedColors: true
      },
      {
        dataType: 1,
        height: 277,
        id: '7',
        left: 375,
        name: 'A plane',
        src: '../../../assets/img/about/2.jpg',
        top: 679,
        uid: 42712775863801976,
        width: 500,
        transform: 270,
        invertedColors: false
      }];
    this.synopsisObjectsHost.viewContainerRef.clear();
    this.componentRefTracker = [];
    for (const obj of testObj) {
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
