import { JoinedTextLine } from '../joined-text-line/joined-text-line';
import { JoinedTextLinepart } from '../joined-text-linepart/joined-text-linepart';
import { JoinedTextBlock } from '../joined-text-block/joined-text-block';
import { JoinedTextElement } from '../joined-text-view/joined-text-view';

export interface JoinedTextMargin extends JoinedTextElement {
  /** The property that links the margins to their parent */
  propertyIri: string;

  /** 'inverted' if the child links to the parent else 'direct' */
  propertyDirection: string;

  /** Configuration of lines in this margin */
  lines?: JoinedTextLine;

  /** Configuration of line parts in this margin */
  lineparts?: JoinedTextLinepart;

  /** Configuration of blocks in this margin */
  blocks?: JoinedTextBlock;

  /** `self` if the margin is a text property that has to be shown directly */
  contentProperty?: string;

  /** If sorting is needed, to by the value of this property */
  sortByPropertyIri?: string;

  /** List of keys for this line part for styling */
  styleKeys?: string[];

  /** True if the margin does not extend the lines in the body. False if the body stretches to make room for margins. */
  fixHeight?: boolean;
}
