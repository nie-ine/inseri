import {
  ComponentFactoryResolver,
  Injectable,
  Inject,
  ReflectiveInjector
} from '@angular/core';

import { ExampleComponent } from 'nie-ine/dist/src/modules/exampleComponent/example.component';

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

  addDynamicComponent() {

    const factory = this.factoryResolver
      .resolveComponentFactory(ExampleComponent);

    const component = factory
      .create(this.rootViewContainer.parentInjector);

    this.rootViewContainer.insert(component.hostView);
    return (ExampleComponent as any).decorators[0].args[0].template;
  }
}
