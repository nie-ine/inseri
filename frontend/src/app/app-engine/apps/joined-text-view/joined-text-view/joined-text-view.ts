import { JoinedTextBlock } from '../joined-text-block/joined-text-block';
import { JoinedTextLine } from '../joined-text-line/joined-text-line';

export interface JoinedTextElement {
  /** The property that links the lines to their parent */
  propertyIri: string;

  /** 'inverted' if the child links to the parent else 'direct' */
  propertyDirection: string;

  /** If sorting is needed, to by the value of this property */
  sortByPropertyIri?: string;

  /** The identifier that leads to the literal content for this resource. */
  contentPropertyIri?: string;

  /** 'self' if the chosen part is already a text value. */
  contentProperty?: string;
}

export interface JoinedTextViewRoot {
  /**
   * Declaration for text blocks in this app.
   */
  blocks?: JoinedTextBlock;

  /**
   * Declaration for text lines in this app.
   */
  lines?: JoinedTextLine;
}
