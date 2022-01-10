import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-all-app-selectors',
  templateUrl: './all-app-selectors.component.html'
})
export class AllAppSelectorsComponent implements OnInit {

  @Input() app: any;
  @Input() appInputQueryMapping: any;
  @Input() i: number;

  @Output() reloadVariables: EventEmitter<any> = new EventEmitter<any>();
  environment = environment;
   /** The unique id of the element the mouse is hovering on.
   */
  @Input() hoveredElement: string;

  /**
   * Give an event containing the unique word id if the mouse hovers on an app's element (e.g. a word in the page description)
   */
  @Output() hoveredElementChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(

  ) { }

  ngOnInit() {
  }

  reloadVariablesFunction() {
    this.reloadVariables.emit();
  }

}
