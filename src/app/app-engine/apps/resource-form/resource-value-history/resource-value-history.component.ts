import { Component, Input, OnInit } from '@angular/core';
import { KnoraV1RequestService } from '../../../../query-engine/knora/knora-v1-request.service';

/**
 * A list of old property values for a recent value.
 */
@Component({
  selector: 'app-resource-value-history',
  templateUrl: './resource-value-history.component.html',
  styleUrls: ['./resource-value-history.component.scss']
})
export class ResourceValueHistoryComponent implements OnInit {

  /**
   * The resource IRI the value belongs to.
   */
  @Input() resourceIRI: string;

  /**
   * The property type of the value.
   */
  @Input() propertyTypeIRI: string;

  /**
   * The IRI of the newest version of this value.
   */
  @Input() valueIRI: string;

  /**
   * Values history as response from Knora instance.
   */
  valueHistory: any;

  constructor(private knoraV1RequestService: KnoraV1RequestService) {
  }

  /**
   * Initialize with getting the value history.
   */
  ngOnInit() {
    this.getValueHistory();
  }

  /**
   * Get value history
   */
  getValueHistory() {
    if (this.resourceIRI) {
      this.knoraV1RequestService.getPropertyValueHistory(this.resourceIRI, this.propertyTypeIRI, this.valueIRI)
        .subscribe(res => {
            this.valueHistory = res;
          },
          err => {
            console.log(err);
          });
    }
  }
}
