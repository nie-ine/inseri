import { Component, Input, OnInit } from '@angular/core';
import { JoinedTextLine } from '../joined-text-line/joined-text-line.component';
import { KnoraV2RequestService } from '../../../../query-engine/knora/knora-v2-request.service';
import { JoinedTextViewKnoraRequestService } from '../joined-text-view-knora-request.service';
import { JoinedTextElement } from '../joined-text-view/joined-text-view.component';
import { JoinedTextWord } from '../joined-text-word/joined-text-word.component';

export interface JoinedTextLinepart extends JoinedTextElement {
  propertyIri: string;
  propertyDirection: string;
  words?: JoinedTextWord;
  lineparts?: JoinedTextLinepart;

  prefix?: string;
  interfix?: string;
  suffix?: string;
}

/**
 * A horizontal text element with the options of left and right columns for marginals or metadata
 */
@Component({
  selector: 'app-joined-text-linepart',
  templateUrl: './joined-text-linepart.component.html',
  styleUrls: ['./joined-text-linepart.component.scss']
})
export class JoinedTextLinepartComponent implements OnInit {

  @Input() parentIri: string;

  @Input() backendAddress;
  @Input() linepartConfiguration: JoinedTextLine;

  lineparts: Array<any>;

  namespaces: any;

  /**
   * default written by angular-cli
   */
  constructor(private knoraV2Request: KnoraV2RequestService, private joinedTextViewKnoraRequest: JoinedTextViewKnoraRequestService) { }

  /**
   * written by angular-cli
   */
  ngOnInit() {

    const graveSearchRequest = this.joinedTextViewKnoraRequest.getGravSearch(this.linepartConfiguration, this.parentIri);

    this.knoraV2Request.extendedSearchFromSpecificInstance(graveSearchRequest, this.backendAddress)
      .subscribe(d => {
        console.log(d);
        if (d['@graph']) {
          this.lineparts = d['@graph'];
        } else {
          this.lineparts = [d];
        }
        this.namespaces = d['@context'];
      }, error1 => {
        console.log(error1);
      });
  }

}
