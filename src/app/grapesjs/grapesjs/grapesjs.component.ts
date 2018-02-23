//our root app component
import {Component, NgModule, VERSION} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {Popup} from './popup'

@Component({
  selector: 'my-app',
  template: `
    <div>
      <h2>Hello {{name}}</h2>
      
<popup #popup1 [title]="'Title of Popup1'">
    <p>html content of  Popup1</p>
</popup>
<popup #popup2 [title]="'Title of Popup2'">
    <p>html content of  Popup2</p>
</popup>
<button md-button (click)="popup1.appear()">show popup 1</button>
<button md-button (click)="popup2.appear()">show popup 2</button>

    </div>
  `,
})
export class GrapesjsComponent {
  name:string;
  showPopup1: boolean;
  showPopup11: boolean;
  showPopup111: boolean;
  showPopup12: boolean;
  showPopup2: boolean;
  constructor() {
    this.name = `Angular! v${VERSION.full}`
  }
  showPopup(num: number) {
    this["showPopup" + num] = true;
  }


  hidePopup(num: number) {
    this["showPopup" + num] = false;
  }
}
