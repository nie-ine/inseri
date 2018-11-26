import { Component, Input, OnInit } from '@angular/core';
import { KnoraV1RequestService } from '../../../../shared/knora/knora-v1-request.service';

/**
 * This components purpose is to make link values more readable.
 * Its only function is to take a resource IRI and to show its label.
 */
@Component({
  selector: 'app-link-value-label-viewer',
  templateUrl: './link-value-label-viewer.component.html',
  styleUrls: ['./link-value-label-viewer.component.scss']
})
export class LinkValueLabelViewerComponent implements OnInit {

  /**
   * The IRI of the resource whose label has to be shown
   */
  @Input() resourceIRI: string;

  /**
   * The data of the link target
   */
  resource: any;

  constructor(private knoraV1RequestService: KnoraV1RequestService) { }

  /**
   * Initialize with getting resource data.
   */
  ngOnInit() {
    if (this.resourceIRI) {
      this.knoraV1RequestService.getResource(this.resourceIRI)
        .subscribe(res => {
            this.resource = res;
          },
          err => {
            console.log(err);
          });
    }
  }

}
