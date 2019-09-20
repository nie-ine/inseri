import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KnoraV2RequestService } from '../../../../query-engine/knora/knora-v2-request.service';

@Component({
  selector: 'app-resource-form-v2',
  templateUrl: './resource-form-v2.component.html',
  styleUrls: ['./resource-form-v2.component.scss']
})
export class ResourceFormV2Component implements OnChanges {

  /**
   * Address to the Knora instance with the text resources.
   */
  @Input() backendAddress: string;

  /**
   * IRI of the resource that holds the parts of the text, unless `queryParamForResourceIRI` is defined.
   */
  @Input() resourceIRI: string;

  /**
   * Query parameter where the IRI of the text resource comes in, as an alternative to internalIRI.
   */
  @Input() queryParamForResourceIRI: string;

  /**
   * The color hovered resources will get.
   */
  @Input() hoverColor: string;

  /**
   * The unique id of the word the mouse is hovering on.
   */
  @Input() hoveredResource: string;

  /**
   * Give an event containing the unique word id if the mouse hovers on a word in the page description
   */
  @Output() hoveredResourceChange: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Variable for the value of resourceIRI or queryParamForResourceIRI, depending on configuration.
   */
  internalIRI: string;

  /**
   * The json-ld structure with the content that has to be displayed.
   */
  resourceData: any;

  /**
   * Constructor
   * @param _route  Activated route for this component
   * @param knoraV2Request  Service for Knora request
   */
  constructor(private _route: ActivatedRoute, private knoraV2Request: KnoraV2RequestService) { }

  /**
   * Subscribe to the query parameters for focus, hovering and other selections.
   */
  ngOnChanges() {
    this._route.queryParams.subscribe(params => {
      if (this.queryParamForResourceIRI) {
        this.internalIRI = params[this.queryParamForResourceIRI];
      }
    });

    if (!this.queryParamForResourceIRI) {
      this.internalIRI = this.resourceIRI;
    }

    if (this.internalIRI) {
      this.getResource();
    }
  }

  getResource() {
    if (this.backendAddress && this.internalIRI) {
      this.knoraV2Request.getResourceFromSpecificInstance(this.internalIRI, this.backendAddress)
        .subscribe(res => {
          this.resourceData = res;
        }, error => {
          console.log(error);
        });
    }
  }

  clickTarget(resId: string) {
    console.log('want to navigate to ' + resId);
  }

  hoverOntoLink(resId: string) {
    this.hoveredResourceChange.emit(resId);
  }

  hoverOutOfLink() {
    this.hoveredResourceChange.emit(null);
  }
}
