import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { HierarchicalNavigationConfiguration } from '../hierarchical-navigation-configuration';
import { KnoraV2RequestService } from '../../../../../query-engine/knora/knora-v2-request.service';
import { HierarchicalNavigationRequestService } from '../hierarchical-navigation-request.service';

@Component({
  selector: 'app-hierarchical-navigation-root',
  templateUrl: './hierarchical-navigation-root.component.html',
  styleUrls: ['./hierarchical-navigation-root.component.scss']
})
export class HierarchicalNavigationRootComponent implements OnChanges {

  /**
   * Address to the backend with the resource with parentIri.
   */
  @Input() backendAddress;

  /**
   * The parent resource of all resources displayed as blocks.
   */
  @Input() resourceIri: string;

  /**
   * Configuration for this component.
   */
  @Input() nodeConfiguration: HierarchicalNavigationConfiguration;

  @Input() queryParams: any;

  @Input() routeKeys: Array<string>;

  @Output() pathChange = new EventEmitter();

  /**
   * The resources to be displayed as text blocks.
   */
  children: Array<any>;

  /**
   * default written by angular-cli
   */
  constructor(
    private knoraV2Request: KnoraV2RequestService,
    private hierarchicalNavigationRequest: HierarchicalNavigationRequestService) { }

  /**
   * load new content with new input variables
   */
  ngOnChanges(changes: SimpleChanges) {

    if (
      (this.resourceIri && this.nodeConfiguration && this.backendAddress) &&
      (changes['parentIri'] || changes['backendAddress'] || changes['nodeConfiguration'])) {
      this.loadChildren();

    }
  }

  loadChildren() {

    if (this.resourceIri && this.nodeConfiguration && this.backendAddress && this.nodeConfiguration.children) {

      const graveSearchRequest = this.hierarchicalNavigationRequest.getGravSearch(this.nodeConfiguration.children, this.resourceIri);

      this.knoraV2Request.extendedSearchFromSpecificInstance(graveSearchRequest, this.backendAddress)
        .subscribe(d => {
          if (d[ '@graph' ]) {
            this.children = d[ '@graph' ];
          } else {
            this.children = [ d ];
          }
        }, error1 => {
          console.log(error1);
        });
    }

  }

  processPathChange() {}



}
