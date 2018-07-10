import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { KnoraV1RequestService } from '../../shared/knora-v1-request.service';

@Component({
  selector: 'app-link-value-editor',
  templateUrl: './link-value-editor.component.html',
  styleUrls: ['./link-value-editor.component.scss']
})
export class LinkValueEditorComponent implements OnInit {

  @Input() targetClass: string;
  @Output() linkValue: EventEmitter<any> = new EventEmitter<any>();

  results: Array<any>;

  searchstring: string;

  constructor(private knoraV1RequestService: KnoraV1RequestService) {
  }

  ngOnInit() {
  }

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

  selectResult(iri) {
    this.linkValue.emit({'link_value': iri});
  }

}
