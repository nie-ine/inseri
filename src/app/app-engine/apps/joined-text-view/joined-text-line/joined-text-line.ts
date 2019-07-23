import { JoinedTextLinepart } from '../joined-text-linepart/joined-text-linepart';
import { JoinedTextMargin } from '../joined-text-margin/joined-text-margin';
import { JoinedTextElement } from '../joined-text-view/joined-text-view';

export interface JoinedTextLine extends JoinedTextElement {
  /** The property that links the lines to their parent */
  propertyIri: string;

  /** 'inverted' if the child links to the parent else 'direct' */
  propertyDirection: string;

  /** If sorting is needed, to by the value of this property */
  sortByPropertyIri?: string;

  /** Configuration of line parts in this block */
  lineparts?: JoinedTextLinepart;

  /** Configuration of margins in the leftmost column */
  farfarleft?: JoinedTextMargin;

  /** Configuration of margins in the second most left column */
  farleft?: JoinedTextMargin;

  /** Configuration of margins directly left of the main column */
  left?: JoinedTextMargin;

  /** Configuration of margins directly right of the main column */
  right?: JoinedTextMargin;

  /** Configuration of margins in the second most right column */
  farright?: JoinedTextMargin;

  /** Configuration of margins in the rightmost column */
  farfarright?: JoinedTextMargin;

  /** List of keys for the lineparts for styling */
  linepartsStyleKeys?: string[];

  /** List of keys for this margin for styling */
  farfarleftStyleKeys?: string[];

  /** List of keys for this margin for styling */
  farleftStyleKeys?: string[];

  /** List of keys for this margin for styling */
  leftStyleKeys?: string[];

  /** List of keys for this margin for styling */
  rightStyleKeys?: string[];

  /** List of keys for this margin for styling */
  farrightStyleKeys?: string[];

  /** List of keys for this margin for styling */
  farfarrightStyleKeys?: string[];

  /** A prefix that is added before the start of the first line */
  prefix?: string;

  /** List of keys for this prefix for styling */
  prefixStyleKeys?: string[];

  /** A prefix that is added befor the start of the non-first lines */
  interfix?: string;

  /** List of keys for this interfix for styling */
  interfixStyleKeys?: string[];

  /** A suffix that is added after the non-last lines */
  interfix2?: string;

  /** List of keys for this interfix for styling */
  interfix2StyleKeys?: string[];

  /** A suffix that is added after the last line */
  suffix?: string;

  /** List of keys for this suffix for styling */
  suffixStyleKeys?: string[];

  /** If true, hovering the line updates the query parameters */
  hoverable?: boolean;

  /** If true, clicking the line updates the query parameters */
  clickable?: boolean;

  /** Background color for resource with same id as hovering query parameter */
  hoverColor?: string;

  /** Background color for resource with same id as clicking query parameter */
  clickColor?: string;

  /**
   * The ratio of the widths of the columns (far far left margin, far left, left margin, middle, right margin, far right, far far right)
   */
  columnRatio?: string[];
}
