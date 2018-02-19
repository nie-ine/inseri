import { Component, OnInit } from '@angular/core';
import { ExampleComponent } from 'nie-ine/dist/src/modules/exampleComponent/example.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log(ExampleComponent);
  }

}
