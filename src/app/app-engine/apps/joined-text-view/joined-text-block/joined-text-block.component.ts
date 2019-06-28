import { Component, Input, OnInit } from '@angular/core';
import { KnoraV2RequestService } from '../../../../query-engine/knora/knora-v2-request.service';
import { JoinedTextViewKnoraRequestService } from '../joined-text-view-knora-request.service';
import { JoinedTextElement } from '../joined-text-view/joined-text-view.component';
import { JoinedTextLine } from '../joined-text-line/joined-text-line.component';
import { JoinedTextLinepart } from '../joined-text-linepart/joined-text-linepart.component';

export interface JoinedTextBlock extends JoinedTextElement {
  propertyIri: string;
  propertyDirection: string;
  lines?: JoinedTextLine;
  lineparts?: JoinedTextLinepart;
}

/**
 * Combination of text lines into a specific form
 */
@Component({
  selector: 'app-joined-text-block',
  templateUrl: './joined-text-block.component.html',
  styleUrls: ['./joined-text-block.component.scss']
})
export class JoinedTextBlockComponent implements OnInit {

  @Input() backendAddress;
  @Input() parentIri: string;

  @Input() blockConfiguration: JoinedTextBlock;

  blocks: Array<any>;

  namespaces: any;

  /**
   * default written by angular-cli
   */
  constructor(private knoraV2Request: KnoraV2RequestService, private joinedTextViewKnoraRequest: JoinedTextViewKnoraRequestService) { }

  /**
   * written by angular-cli
   */
  ngOnInit() {

    const graveSearchRequest = this.joinedTextViewKnoraRequest.getGravSearch(this.blockConfiguration, this.parentIri);

    this.knoraV2Request.extendedSearchFromSpecificInstance(graveSearchRequest, this.backendAddress)
      .subscribe(d => {
        console.log(d);
        if (d['@graph']) {
          this.blocks = d['@graph'];
        } else {
          this.blocks = [d];
        }
        this.namespaces = d['@context'];
      }, error1 => {
        console.log(error1);
      });
  }

}
