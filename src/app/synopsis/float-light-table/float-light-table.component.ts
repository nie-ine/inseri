import {Component, ComponentFactoryResolver, ComponentRef, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {SynopsisObjectAnchorDirective} from '../synopsis-object-anchor.directive';
import {SynopsisObjectSerializerService} from '../synopsis-object-serializer.service';
import {SynopsisObjectModifierService} from '../synopsis-object-modifier.service';
import {SynopsisObjectData, SynopsisObjectType} from '../synopsis-object-data';
import {SynopsisObject} from '../synopsis-object';
import {FloatingTextObjectComponent} from '../floating-text-object/floating-text-object.component';
import {FloatingImageObjectComponent} from '../floating-image-object/floating-image-object.component';
import {SynopsisItem} from '../synopsis-item';
import {LightTableStashService} from '../light-table-stash.service';
import {Subscription} from 'rxjs/Subscription';

interface ComponentRefTracker {
  [uid: number]: ComponentRef<SynopsisObject>;
}

@Component({
  selector: 'app-float-light-table',
  templateUrl: './float-light-table.component.html',
  styleUrls: ['./float-light-table.component.scss']
})
export class FloatLightTableComponent implements OnInit, OnDestroy {
  @ViewChild(SynopsisObjectAnchorDirective) synopsisObjectsHost: SynopsisObjectAnchorDirective;

  private componentRefTracker: ComponentRefTracker = [];
  private closeObjectSubscriber: Subscription;
  private loadLightTableSnapshotSubscriber: Subscription;
  private makeLightTableSnapshotSubscriber: Subscription;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private lightTableStashService: LightTableStashService,
              private synopsisObjectModifierService: SynopsisObjectModifierService,
              private synopsisObjectSerializerService: SynopsisObjectSerializerService,
              private el: ElementRef,
              private renderer: Renderer2) {
    this.closeObjectSubscriber =
      synopsisObjectModifierService.closeObject$.subscribe(uid => this.closeObject(uid));
    synopsisObjectModifierService.resizeObject$.subscribe(obj => this.updateDimensions(obj[0], obj[1], obj[2]));
    synopsisObjectModifierService.rotateObject$.subscribe(obj => this.updateRotation(obj[0], obj[1]));
    synopsisObjectModifierService.invertColors$.subscribe(uid => this.updateInversion(uid));
    this.makeLightTableSnapshotSubscriber =
      synopsisObjectSerializerService.makeLightTableSnapshot$.subscribe(() => this.makeSnapshot());
  }

  ngOnInit() {
    if (this.lightTableStashService.fetch()) {
      this.load(this.lightTableStashService.fetch());
    }
    this.loadLightTableSnapshotSubscriber =
      this.synopsisObjectSerializerService.loadLightTableSnapshot$.subscribe(snapshot => this.load(snapshot));
  }

  ngOnDestroy() {
    this.lightTableStashService.stash(this.serializeData());
    this.closeObjectSubscriber.unsubscribe();
    this.makeLightTableSnapshotSubscriber.unsubscribe();
    this.loadLightTableSnapshotSubscriber.unsubscribe();
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
    this.synopsisObjectSerializerService.sendLightTableSnapshot(this.serializeData());
  }

  load(snapshot: SynopsisObjectData[]) {
    if (this.synopsisObjectsHost) {
      this.synopsisObjectsHost.viewContainerRef.clear();
    }
    this.componentRefTracker = [];
    for (const obj of snapshot) {
      const dropZoneLeft = this.el.nativeElement.getBoundingClientRect().left;
      const dropZoneTop = this.el.nativeElement.getBoundingClientRect().top;
      if (obj.left < dropZoneLeft) {
        obj.left = dropZoneLeft;
      }
      if (obj.top < dropZoneTop) {
        obj.top = dropZoneTop;
      }
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
      new SynopsisItem(FloatingTextObjectComponent, data) :
      new SynopsisItem(FloatingImageObjectComponent, data);
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(synopsisItem.component);
    return this.synopsisObjectsHost.viewContainerRef.createComponent(componentFactory);
  }

  private closeObject(uid: number) {
    this.synopsisObjectsHost.viewContainerRef.remove(this.viewRefIndex(uid));
    delete this.componentRefTracker[uid];
  }

  private viewRefIndex(uid: number): number {
    return this.synopsisObjectsHost.viewContainerRef.indexOf(this.componentRefTracker[uid].hostView);
  }

  private updateDimensions(uid: number, width: number, height: number) {
    if (this.componentRefTracker[uid]) {
      (<SynopsisObject>this.componentRefTracker[uid].instance).data.width = width;
      (<SynopsisObject>this.componentRefTracker[uid].instance).data.height = height;
    }
  }

  private updateRotation(uid: number, angle: number) {
    if (this.componentRefTracker[uid]) {
      (<SynopsisObject>this.componentRefTracker[uid].instance).data.transform =
        ((<SynopsisObject>this.componentRefTracker[uid].instance).data.transform ?
          (<SynopsisObject>this.componentRefTracker[uid].instance).data.transform : 0) + angle;
    }
  }

  private updateInversion(uid: number) {
    if (this.componentRefTracker[uid]) {
      (<SynopsisObject>this.componentRefTracker[uid].instance).data.invertedColors =
        !(<SynopsisObject>this.componentRefTracker[uid].instance).data.invertedColors;
    }
  }

  private setObjectViewProperty(componentRef: ComponentRef<SynopsisObject>, property: string, value: string | number) {
    if ((<SynopsisObject>componentRef.instance).data[property]) {
      this.renderer.setStyle(componentRef.location.nativeElement.querySelector('div'), property, value);
    }
  }

  private serializeData(): SynopsisObjectData[] {
    return Object.keys(this.componentRefTracker).map(key =>
      (<SynopsisObject>this.componentRefTracker[key].instance).data
    );
  }


}
