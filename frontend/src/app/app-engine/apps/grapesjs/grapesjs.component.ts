import {AfterViewChecked, Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/map'

declare var grapesjs: any; // Important!


@Component({
  selector: 'app-grapesjs',
  template: '<div id="grapesJSViewer"></div>'
})
export class GrapesjsComponent implements AfterViewChecked {

  constructor() { }

  ngAfterViewChecked() {
    const editor = grapesjs.init({
      container: '#grapesJSViewer',
      components: '<div class="txt-red">Hello world!</div>',
      style: '.txt-red{color: red}',
    });

    const blockManager = editor.BlockManager;

    blockManager.add('konvolut-titel', {
      label: 'Vokabulare in Knora',
      attributes: { class:'fa fa-newspaper-o' },
      content:  '<div>NIE-INE test</div>',
    });
  }
}
