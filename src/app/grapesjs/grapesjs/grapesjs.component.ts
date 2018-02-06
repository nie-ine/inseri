import { Component, OnInit, ComponentRef } from '@angular/core';
import 'rxjs/add/operator/map';
import {
  Inject,
  ViewContainerRef
} from '@angular/core';
import { Service } from '../createComponentInstances.service';

declare var grapesjs: any; // Important!

@Component({
  selector: 'app-grapesjs',
  template: '<div id="gjs"></div>',
  providers: [Service],
  styleUrls: ['./grapesjs.component.scss']
})
export class GrapesjsComponent implements OnInit {

  name = 'from Angular';
  testblock: string;

  constructor(@Inject(Service) service, @Inject(ViewContainerRef) viewContainerRef) {
    service.setRootViewContainerRef(viewContainerRef);
    this.testblock = service.addDynamicComponent();
    console.log(service.addDynamicComponent());
  }

  ngOnInit() {

    const editor = grapesjs.init({
      container : '#gjs',
      components: '<div class="txt-red">Beginning Template</div>',
      style: '.txt-red{color: red}',
    });

    const blockManager = editor.BlockManager;

    blockManager.add('nie-test', {
      label: 'nie test',
      attributes: { class:'fa fa-newspaper-o' },
      content:  this.testblock,
    });

  }

}
