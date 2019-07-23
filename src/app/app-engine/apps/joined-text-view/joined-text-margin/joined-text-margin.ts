import { JoinedTextLine } from '../joined-text-line/joined-text-line';
import { JoinedTextLinepart } from '../joined-text-linepart/joined-text-linepart';
import { JoinedTextBlock } from '../joined-text-block/joined-text-block';
import { JoinedTextElement } from '../joined-text-view/joined-text-view';

export interface JoinedTextMargin extends JoinedTextElement {
  propertyIri: string;
  propertyDirection: string;
  lines?: JoinedTextLine;
  lineparts?: JoinedTextLinepart;
  blocks?: JoinedTextBlock;
  contentProperty?: string;
  sortByPropertyIri?: string;
  styleKeys?: string[];

  fixHeight?: boolean;
  overflowX?: string;
  overflowY?: string;
  whitespaceBehavior?: string;
}
