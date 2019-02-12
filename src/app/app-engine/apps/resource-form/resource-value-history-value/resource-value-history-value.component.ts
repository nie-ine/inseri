import { Component, Input, OnInit } from '@angular/core';
import { KnoraV1RequestService } from '../../../../query-engine/knora/knora-v1-request.service';

/**
 * Component to show values of properties. The property type is handled inside.
 */
@Component({
  selector: 'app-resource-value-history-value',
  templateUrl: './resource-value-history-value.component.html',
  styleUrls: ['./resource-value-history-value.component.scss']
})
export class ResourceValueHistoryValueComponent implements OnInit {

  /**
   * The IRI of the value to be displayed
   */
  @Input() valueIRI: string;

  /**
   * The data of the value
   */
  valueData: any;

  constructor(private knoraV1RequestService: KnoraV1RequestService) {
  }

  /**
   * Get value data on init
   */
  ngOnInit() {
    this.getValue();
  }

  /**
   * Get the data of the value and store them in the component
   */
  getValue() {
    // TODO: do request in service
    if (this.valueIRI) {
      this.knoraV1RequestService.getPropetyValue(this.valueIRI)
        .subscribe(res => {
            this.valueData = res;
          },
          err => {
            console.log(err);
          });
    }
  }
}
