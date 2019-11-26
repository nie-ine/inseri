import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-all-app-selectors',
  templateUrl: './all-app-selectors.component.html'
})
export class AllAppSelectorsComponent implements OnInit {

  @Input() app: any;
  @Input() appInputQueryMapping: any;
  @Output() reloadVariables: EventEmitter<any> = new EventEmitter<any>();

  constructor(

  ) { }

  ngOnInit() {
  }

  reloadVariablesFunction() {
    this.reloadVariables.emit();
  }

}
