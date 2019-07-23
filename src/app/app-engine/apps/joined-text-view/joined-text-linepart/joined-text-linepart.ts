import { JoinedTextElement } from '../joined-text-view/joined-text-view';

export interface JoinedTextLinepart extends JoinedTextElement {
  /** The property that links the lines to their parent */
  propertyIri: string;

  /** 'inverted' if the child links to the parent else 'direct' */
  propertyDirection: string;

  /** If sorting is needed, to by the value of this property */
  sortByPropertyIri?: string;

  /** Configuration of line parts in this line part */
  lineparts?: JoinedTextLinepart;

  /** If true, hovering the line updates the query parameters */
  hoverable?: boolean;

  /** If true, clicking the line updates the query parameters */
  clickable?: boolean;

  /** Background color for resource with same id as hovering query parameter */
  hoverColor?: string;

  /** Background color for resource with same id as clicking query parameter */
  clickColor?: string;

  /** List of keys for this line part for styling */
  styleKeys?: string[];

  /** A prefix that is added before the start of the first line */
  prefix?: string;

  /** List of keys for this prefix for styling */
  prefixStyleKeys?: string[];

  /** A prefix that is added befor the start of the non-first lines */
  interfix?: string;

  /** List of keys for this interfix for styling */
  interfixStyleKeys?: string[];

  /** A suffix that is added after the last line */
  suffix?: string;

  /** List of keys for this suffix for styling */
  suffixStyleKeys?: string[];
}
