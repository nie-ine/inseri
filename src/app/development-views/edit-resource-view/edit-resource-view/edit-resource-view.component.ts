import { Component, OnInit } from '@angular/core';
import { KnoraV1RequestService } from '../../../shared/knora-v1-request.service';

/**
 * This component shows the use of the module ResourceFormModule.
 * It can be deleted after development.
 */
@Component({
  selector: 'app-edit-resource-view',
  templateUrl: './edit-resource-view.component.html',
  styleUrls: ['./edit-resource-view.component.scss']
})
export class EditResourceViewComponent implements OnInit {

  resourceIRI: string;
  editRights = false;

  results: Array<any>;

  searchstring: string;

  constructor(private knoraV1RequestService: KnoraV1RequestService) {
  }

  ngOnInit() {
  }

  search() {
    this.knoraV1RequestService.searchResourcesByLabel(this.searchstring)
    .subscribe( res => {
      this.results = res['resources'];
    });
    this.resourceIRI = null;
  }

  selectResult(iri) {
    this.resourceIRI = iri;
  }

  resourceDeletion() {
    alert('Resource successfully deleted');
  }

}
