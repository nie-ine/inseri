import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { KnoraV1RequestService } from '../../../../shared/knora/knora-v1-request.service';

/**
 * This component can be used to link to existing Knora resources.
 * It takes the resource class of the target and gives the link in a Knora V1 compatible format.
 */
@Component({
  selector: 'app-link-value-editor',
  templateUrl: './link-value-editor.component.html',
  styleUrls: ['./link-value-editor.component.scss']
})
export class LinkValueEditorComponent implements OnInit {

  /**
   * Optional input with the target resource class to offer only resources that can be linked to from the source node.
   */
  @Input() targetClass: string;

  /**
   * Event containing the new value like `{ 'link_value': <link target iri> }`
   * @type {EventEmitter<any>}
   */
  @Output() linkValue: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Resources whose label matches the searchstring
   */
  results: Array<any>;

  /**
   * Searchstring for the search by label
   */
  searchstring: string;

  constructor(private knoraV1RequestService: KnoraV1RequestService) {
  }

  /**
   * @ignore
   */
  ngOnInit() {
  }

  /**
   * look for resources by label matching the searchstring.
   * If a target class is defined, the search will be restricted to that.
   */
  search() {

    if (this.targetClass) {
      const resourceClassIRI = this.targetClass.replace(/^restypeid=/, '');

      this.knoraV1RequestService.searchResourcesByLabelByResourceClass(this.searchstring, resourceClassIRI)
        .subscribe(res => {
          this.results = res['resources'];
        });
    } else {
      this.knoraV1RequestService.searchResourcesByLabel(this.searchstring)
        .subscribe(res => {
          this.results = res['resources'];
        });
    }
  }

  /**
   * Emit the IRI of the resource that has been selected for the link.
   * @param iri
   */
  selectResult(iri) {
    this.linkValue.emit({'link_value': iri});
  }

}
