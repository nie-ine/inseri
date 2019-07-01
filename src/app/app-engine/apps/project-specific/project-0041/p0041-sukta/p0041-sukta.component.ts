import { Component, Input, OnChanges } from '@angular/core';
import { KnoraV2RequestService } from '../../../../../query-engine/knora/knora-v2-request.service';

@Component({
  selector: 'app-p0041-sukta',
  templateUrl: './p0041-sukta.component.html',
  styleUrls: ['./p0041-sukta.component.scss']
})
export class P0041SuktaComponent implements OnChanges {

  @Input() backendAddress: string;

  @Input() resourceIRI: string;

  @Input() stropheIRI: string;

  /**
   * The json-ld object of the sukta in Knora V2 format.
   */
  suktaData: any;

  /**
   * Constructor initializes KnoraV2RequestService.
   * @param knora2request  Service to access a Knora instance.
   */
  constructor(private knora2request: KnoraV2RequestService) { }

  /**
   * Do a request for the data of this sukta when the address to it changes.
   */
  ngOnChanges() {
    if (this.resourceIRI && this.backendAddress) {
      this.getSuktaData();
    }
  }

  /**
   * Get the json-ld representation of the kanda.
   */
  getSuktaData() {
    this.knora2request.getResourceFromSpecificInstance(this.resourceIRI, this.backendAddress)
      .subscribe(d => {
        this.suktaData = d;
      }, error1 => {
        console.log(error1);
      });
  }
}
