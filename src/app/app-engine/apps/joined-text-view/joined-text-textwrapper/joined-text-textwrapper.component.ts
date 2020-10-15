import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SelectableEnvironments, StyleDeclaration } from '../../shared/rich-text/text-rich-innerhtml/text-rich-innerhtml.component';

@Component({
  selector: 'app-joined-text-textwrapper',
  templateUrl: './joined-text-textwrapper.component.html',
  styleUrls: ['./joined-text-textwrapper.component.scss']
})
export class JoinedTextTextwrapperComponent implements OnChanges {

  /**
   * A Knora resource with a text that has to be displayed.
   */
  @Input() resource: any;

  /**
   * The IRI of the property with the text in the resource.
   */
  @Input() propertyIri: string;

  /**
   * The ontological namespaces by prefix.
   */
  @Input() namespaces: any;

  /**
   * Base style declaration.
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
   * The propertyIri formated with a prefix instead of a namespace.
   */
  propertyKey: string;

  constructor() { }

  /**
   * Take in propertyIRIs and turn them into prefixed form. Renew with changes.
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges) {
    if ((this.propertyIri && this.namespaces) && (changes['propertyIri'] || changes['namespaces'] )) {
      let tempKey = this.propertyIri;

      // Change from simple API Knora namespaces to prefixes
      tempKey = tempKey.replace('/simple/v2#', '/v2#');
      for (const ns of Object.keys(this.namespaces)) {
        tempKey = tempKey.replace(this.namespaces[ns], ns + ':');
      }

      this.propertyKey = tempKey;
    }
  }

}
