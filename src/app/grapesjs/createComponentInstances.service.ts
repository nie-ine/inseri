import {
  ComponentFactoryResolver,
  Injectable,
  Inject
} from '@angular/core';

@Injectable()
export class Service {

  factoryResolver: any;
  rootViewContainer: any;
  image = {
    '@id' : 'http://rdfh.ch/kuno-raeber/Uzo2YDhzTr-8CUSg1pQL4Q/values/gJVf-AQjSbSTAo8EsU8ErQ',
    '@type' : 'knora-api:StillImageFileValue',
    'knora-api:fileValueAsUrl' :
      'https://tools.wmflabs.org/' +
      'zoomviewer/proxy.php?iiif=Lions_Family_Portrait_Masai_Mara.jpg/pct:65,81,35,15/full/0/default.jpg',
    'knora-api:fileValueHasFilename' : 'proxy.php?iiif=Lions_Family_Portrait_Masai_Mara.jpg',
    'knora-api:fileValueIsPreview' : false,
    'knora-api:stillImageFileValueHasDimX' : 5184,
    'knora-api:stillImageFileValueHasDimY' : 3456,
    'knora-api:stillImageFileValueHasIIIFBaseUrl' : 'https://tools.wmflabs.org/zoomviewer'
  };

  constructor(@Inject(ComponentFactoryResolver) factoryResolver) {
    this.factoryResolver = factoryResolver;
  }

  setRootViewContainerRef(viewContainerRef) {
    this.rootViewContainer = viewContainerRef;
  }

  addDynamicComponent(newComponent) {
    const factory = this.factoryResolver
      .resolveComponentFactory(newComponent.constructor);

    const component = this.rootViewContainer
      .createComponent(factory);

    component.instance.height = 100;
    component.instance.width = 100;
    component.instance.image = this.image;
    console.log(component);

  }
}
