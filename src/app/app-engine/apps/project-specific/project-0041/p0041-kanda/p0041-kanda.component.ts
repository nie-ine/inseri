import { Component, Input, OnChanges } from '@angular/core';
import { KnoraV2RequestService } from '../../../../../query-engine/knora/knora-v2-request.service';

@Component({
  selector: 'app-p0041-kanda',
  templateUrl: './p0041-kanda.component.html',
  styleUrls: ['./p0041-kanda.component.scss']
})
export class P0041KandaComponent implements OnChanges {

  @Input() backendAddress: string;

  @Input() resourceIRI: string;

  @Input() suktaIRI: string;

  /**
   * The json-ld object of the kanda in Knora V2 format.
   */
  kandaData: any;

  /**
   * Constructor initializes KnoraV2RequestService.
   * @param knora2request  Service to access a Knora instance.
   */
  constructor(private knora2request: KnoraV2RequestService) { }

  /**
   * Do a request for the data of this kanda when the address to it changes.
   */
  ngOnChanges() {
    if (this.resourceIRI && this.backendAddress) {
      this.getKandaData();
    }
  }

  /**
   * Get the json-ld representation of the kanda.
   */
  getKandaData() {
    this.knora2request.getResourceFromSpecificInstance(this.resourceIRI, this.backendAddress)
      .subscribe(d => {
        this.kandaData = d;
      }, error1 => {
        console.log(error1);
      });
  }

}
