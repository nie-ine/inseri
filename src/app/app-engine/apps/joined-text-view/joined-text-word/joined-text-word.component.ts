import { Component, Input, OnInit } from '@angular/core';
import { KnoraV2RequestService } from '../../../../query-engine/knora/knora-v2-request.service';
import { JoinedTextViewKnoraRequestService } from '../joined-text-view-knora-request.service';

export interface JoinedTextWord {
  contentPropertyIri?: string;
  propertyIri: string;
  propertyDirection: string;

  prefix?: string;
  interfix?: string;
  suffix?: string;
}

/**
 * A horizontal text element with the options of left and right columns for marginals or metadata
 */
@Component({
  selector: 'app-joined-text-word',
  templateUrl: './joined-text-word.component.html',
  styleUrls: ['./joined-text-word.component.scss']
})
export class JoinedTextWordComponent implements OnInit {

  @Input() parentIri: string;

  @Input() backendAddress;
  @Input() wordConfiguration: JoinedTextWord;

  words: Array<any>;

  namespaces: any;

  /**
   * default written by angular-cli
   */
  constructor(private knoraV2Request: KnoraV2RequestService, private joinedTextViewKnoraRequest: JoinedTextViewKnoraRequestService) { }

  /**
   * written by angular-cli
   */
  ngOnInit() {

    const graveSearchRequest = this.joinedTextViewKnoraRequest.getGravSearch(this.wordConfiguration, this.parentIri);

    this.knoraV2Request.extendedSearchFromSpecificInstance(graveSearchRequest, this.backendAddress)
      .subscribe(d => {
        console.log(d);
        if (d['@graph']) {
          this.words = d['@graph'];
        } else {
          this.words = [d];
        }
        this.namespaces = d['@context'];
      }, error1 => {
        console.log(error1);
      });
  }


}
