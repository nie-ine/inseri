import { Component, OnInit, ComponentRef, AfterContentInit, ElementRef } from '@angular/core';
import 'rxjs/add/operator/map';
import {
  Inject,
  ViewContainerRef
} from '@angular/core';
import { Service } from '../createComponentInstances.service';
import {
  ExampleComponent,
  ImageFrameComponent
} from 'nie-ine';

declare var grapesjs: any; // Important!

@Component({
  selector: 'app-grapesjs',
  templateUrl: './grapesjs.component.html',
  providers: [Service],
  styleUrls: ['./grapesjs.component.scss']
})
export class GrapesjsComponent {

  imageFrameComponent: any;
  exampleComponent: any;
  node: string;

  picdata = {
    '@id' : 'http://rdfh.ch/kuno-raeber/Uzo2YDhzTr-8CUSg1pQL4Q/values/gJVf-AQjSbSTAo8EsU8ErQ',
    '@type' : 'knora-api:StillImageFileValue',
    'knora-api:fileValueAsUrl' :
    'https://tools.wmflabs.org/zoomviewer/' +
    'proxy.php?iiif=Lions_Family_Portrait_Masai_Mara.jpg/pct:65,81,35,15/full/0/default.jpg',
    'knora-api:fileValueHasFilename' : 'proxy.php?iiif=Lions_Family_Portrait_Masai_Mara.jpg',
    'knora-api:fileValueIsPreview' : false,
    'knora-api:stillImageFileValueHasDimX' : 5184,
    'knora-api:stillImageFileValueHasDimY' : 3456,
    'knora-api:stillImageFileValueHasIIIFBaseUrl' : 'https://tools.wmflabs.org/zoomviewer'
  };


  constructor(public service: Service, private viewContainerRef: ViewContainerRef, private elementRef: ElementRef) {
    this.viewContainerRef = viewContainerRef;
    this.service.setRootViewContainerRef(this.viewContainerRef);
  }
  addExampleComponent () {
    this.exampleComponent = new ExampleComponent;
    this.service.addDynamicComponent(this.exampleComponent);
    this.service.addDynamicComponent(new BreakComponent);
  }

  addImageComponent () {
    this.service.addDynamicComponent(new ImageFrameComponent(this.elementRef));
  }


}

@Component({
  selector: 'break-component',
  template: '<br>',
})
export class BreakComponent {

}

