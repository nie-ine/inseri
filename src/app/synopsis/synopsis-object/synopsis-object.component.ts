import {Component, OnInit, Type} from '@angular/core';

@Component({
  selector: 'app-synopsis-object',
  templateUrl: './synopsis-object.component.html',
  styleUrls: ['./synopsis-object.component.scss']
})
export class SynopsisObjectComponent implements OnInit {

  constructor(public component: Type<any>, public data: any) { }

  ngOnInit() {
  }

}
