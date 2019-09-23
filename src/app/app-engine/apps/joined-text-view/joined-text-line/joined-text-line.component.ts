import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { KnoraV2RequestService } from '../../../../query-engine/knora/knora-v2-request.service';
import { JoinedTextViewKnoraRequestService } from '../joined-text-view-knora-request.service';
import { SelectableEnvironments, StyleDeclaration } from '../../shared/rich-text/text-rich-innerhtml/text-rich-innerhtml.component';
import { JoinedTextLine } from './joined-text-line';

/**
 * A horizontal text element with the options of left and right columns for marginals or metadata
 */
@Component({
  selector: 'app-joined-text-line',
  templateUrl: './joined-text-line.component.html',
  styleUrls: ['./joined-text-line.component.scss']
})
export class JoinedTextLineComponent implements OnChanges {

  /**
   * The identifier of the parent element of the lines.
   */
  @Input() parentIri: string;

  /**
   * The Knora instance with the data.
   */
  @Input() backendAddress;

  /**
   * The parameters for the line behaviour.
   */
  @Input() lineConfiguration: JoinedTextLine;

  /**
   * Default style declarations.
   */
  @Input() styleDeclarations: Array<StyleDeclaration>;

  /**
   * Dynamic style declarations.
   */
  @Input() selectiveStyleDeclarations: SelectableEnvironments;

  /**
   * Keys of selected selectiveStyleDeclarations.
   */
  @Input() highlighted: Array<string>;

  /**
   * The unique id of the word that was last clicked and counts as activated. Only one word can be counted as activated at a time.
   */
  @Input() clickedResource: string;

  /**
   * Give an event containing the unique word id if a word on the page description is clicked
   */
  @Output() clickedResourceChange: EventEmitter<string> = new EventEmitter<string>();

  /**
   * The unique id of the word the mouse is hovering on.
   */
  @Input() hoveredResource: string;

  /**
   * Give an event containing the unique word id if the mouse hovers on a word in the page description
   */
  @Output() hoveredResourceChange: EventEmitter<string> = new EventEmitter<string>();

  /**
   * All line objects in this component.
   */
  lines: Array<any>;

  /**
   * Ontology namespaces around this resource.
   */
  namespaces: any;

  /**
   * Default values for the column ratios.
   */
  widths = {
    farfarleftStyleKeys: '12.5%',
    farleftStyleKeys: '12.5%',
    leftStyleKeys: '12.5%',
    middleStyleKeys: '25%',
    rightStyleKeys: '12.5%',
    farrightStyleKeys: '12.5%',
    farfarrightStyleKeys: '12.5%'
  };

  /**
   * default written by angular-cli
   */
  constructor(private knoraV2Request: KnoraV2RequestService, private joinedTextViewKnoraRequest: JoinedTextViewKnoraRequestService) { }

  /**
   * load content with changing input variables
   */
  ngOnChanges(changes: SimpleChanges) {
    if (this.lineConfiguration.columnRatio) {
      this.calculateWidths(this.lineConfiguration.columnRatio);
    }

    if ((this.backendAddress && this.parentIri && this.lineConfiguration) && (changes['parentIri'] || changes['backendAddress'] || changes['lineConfiguration'])) {
      const gravSearchRequest = this.joinedTextViewKnoraRequest.getGravSearch(this.lineConfiguration, this.parentIri);

      this.knoraV2Request.extendedSearchFromSpecificInstance(gravSearchRequest, this.backendAddress)
        .subscribe(d => {
          if (d[ '@graph' ]) {
            this.lines = d[ '@graph' ];
          } else {
            this.lines = [ d ];
          }
          this.namespaces = d[ '@context' ];
        }, error1 => {
          console.log(error1);
        });
    }
  }

  /**
   * Given the declared relative column widths, calculate width percentages.
   */
  calculateWidths(columnRatio) {

    if (columnRatio[0]) {
      this.widths.farfarleftStyleKeys = columnRatio[0];
    } else {
      this.widths.farfarleftStyleKeys = '0';
    }

    if (columnRatio[1]) {
      this.widths.farleftStyleKeys = columnRatio[1];
    } else {
      this.widths.farleftStyleKeys = '0';
    }

    if (columnRatio[2]) {
      this.widths.leftStyleKeys = columnRatio[2];
    } else {
      this.widths.leftStyleKeys = '0';
    }

    if (columnRatio[3]) {
      this.widths.middleStyleKeys = columnRatio[3];
    } else {
      this.widths.middleStyleKeys = '100%';
    }

    if (columnRatio[4]) {
      this.widths.rightStyleKeys = columnRatio[4];
    } else {
      this.widths.rightStyleKeys = '0';
    }

    if (columnRatio[5]) {
      this.widths.farrightStyleKeys = columnRatio[5];
    } else {
      this.widths.farrightStyleKeys = '0';
    }

    if (columnRatio[6]) {
      this.widths.farfarrightStyleKeys = columnRatio[6];
    } else {
      this.widths.farfarrightStyleKeys = '0';
    }
  }

  /**
   * When an element is clicked (in this component or in a child), give the identifier of that element as output to be used outside for
   * updating the query parameter.
   * @param resIri  The identifier of a the clicked resource that is further used as query parameter.
   */
  clickChange(resIri: string) {
    this.clickedResourceChange.emit(resIri);
  }

  /**
   * When an element is hovered over (in this component or in a child), give the identifier of that element as output to be used outside for
   * updating the query parameter.
   * @param resIri  The identifier of a the hovered resource that is further used as query parameter.
   */
  hoverChange(resIri: string) {
    this.hoveredResourceChange.emit(resIri);
  }

  /**
   * When a line is clicked, set the variable clickedResource to a words unique identifier
   * and communicate this as output clickedResourceChange.
   * @param lineIri: the unique identifier of a text element that is clicked
   */
  clickLine(lineIri: string) {
    if (this.lineConfiguration.clickable) {
      this.clickedResourceChange.emit(lineIri);
    }
  }

  /**
   * When the mouse hovers on a line, set the variable hoveredResource to a line's unique identifier and communicate this as output
   * hoveredResourceChange.
   * @param lineIri: the unique identifier of a text element that is clicked
   */
  hoverOntoLine(lineIri: string) {
    if (this.lineConfiguration.hoverable) {
      this.hoveredResourceChange.emit(lineIri);
    }
  }

  /**
   * When the mouse leaves from a line, reset the variable hoveredResource and communicate this as output hoveredResourceChange.
   */
  hoverOutOfLine() {
    if (this.lineConfiguration.hoverable) {
      this.hoveredResourceChange.emit(null);
    }
  }

  /**
   * Using an external style definition, get all the CSS definition for this element, depending on keys.
   * @param paramKey  The key of the definitions of the style environment for this element.
   * @param resId  The identifier of the element for specific highlighting.
   */
  getStyleDict(paramKey, resId) {
    const styles = {};

    if (this.styleDeclarations && this.lineConfiguration[paramKey]) {
      for (const b of this.styleDeclarations) {
        if (b[ 'type' ] === 'component') {
          if (this.lineConfiguration[paramKey].indexOf(b['name']) > -1) {
            for (const [key, value] of Object.entries((b['styles']))) {
              styles[key] = value;
            }
          }
        }
      }
    }
    if (this.highlighted && this.selectiveStyleDeclarations && this.lineConfiguration[paramKey]) {
      for (const s of this.highlighted ) {
        const z = this.selectiveStyleDeclarations[s];
        for (const b of z) {
          if (b[ 'type' ] === 'component') {
            if (this.lineConfiguration[paramKey].indexOf(b['name']) > -1) {
              for (const [key, value] of Object.entries((b['styles']))) {
                styles[key] = value;
              }
            }
          }
        }
      }
    }

    if (resId && resId === this.hoveredResource) {
      styles['background-color'] = this.lineConfiguration.hoverColor;
    }

    if (resId && resId === this.clickedResource) {
      styles['background-color'] = this.lineConfiguration.clickColor;
    }

    styles['width'] = this.widths[paramKey];
    return styles;
  }

}
