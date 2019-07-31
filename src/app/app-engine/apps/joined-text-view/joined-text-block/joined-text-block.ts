import { JoinedTextLine } from '../joined-text-line/joined-text-line';
import { JoinedTextLinepart } from '../joined-text-linepart/joined-text-linepart';
import { JoinedTextElement } from '../joined-text-view/joined-text-view';

export interface JoinedTextBlock extends JoinedTextElement {
  /** The property that links the lines to their parent */
  propertyIri: string;

  /** 'inverted' if the child links to the parent else 'direct' */
  propertyDirection: string;

  /** If sorting is needed, to by the value of this property */
  sortByPropertyIri?: string;

  /** Configuration of lines in this block */
  lines?: JoinedTextLine;

  /** Configuration of line parts in this block */
  lineparts?: JoinedTextLinepart;

  /** List of keys for this block for styling */
  styleKeys?: string[];
}
