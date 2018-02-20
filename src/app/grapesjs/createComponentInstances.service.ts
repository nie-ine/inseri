import {
  ComponentFactoryResolver,
  Injectable,
  Inject
} from '@angular/core';

@Injectable()
export class Service {

  factoryResolver: any;
  rootViewContainer: any;

  constructor(@Inject(ComponentFactoryResolver) factoryResolver) {
    this.factoryResolver = factoryResolver;
  }

  setRootViewContainerRef(viewContainerRef) {
    this.rootViewContainer = viewContainerRef;
  }

  addDynamicComponent(newComponent) {
    const factory = this.factoryResolver
      .resolveComponentFactory(newComponent.constructor);

    const component = factory
      .create(this.rootViewContainer.parentInjector);

    this.rootViewContainer.insert(component.hostView);
    return newComponent.constructor.decorators[0].args[0].template;
  }
}
