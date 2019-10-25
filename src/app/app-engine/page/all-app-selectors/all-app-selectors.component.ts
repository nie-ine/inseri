import {Component, Input, OnInit} from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-all-app-selectors',
  templateUrl: './all-app-selectors.component.html'
})
export class AllAppSelectorsComponent implements OnInit {

  @Input() app: any;

  constructor(

  ) { }

  ngOnInit() {
  }

}
