import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-simple-image-app',
  templateUrl: './simple-image-app.component.html'
})
export class SimpleImageAppComponent implements OnChanges {
  @Input() imageURL: string;
  constructor() { }

  ngOnChanges() {
  }

}
