/**
 * A page of a transcription, consisting of lines and words with positions.
 */
export interface PageTree {

  /**
   * Human-readable identifier of the page.
   */
  pageId: string;

  /**
   * Height of the page in pixels.
   */
  pageHeight: number;

  /**
   * Width of the page in pixels.
   */
  pageWidth: number;

  /**
   * Lines that are part of the page.
   */
  lines: Array<PageTreeLine>;
}

/**
 * A line as a part of a transcription of a page, consisting of words.
 */
export interface PageTreeLine {

  /**
   * Human-readable identifier of the line.
   */
  lineId: string;

  /**
   * Unique identifier of the line.
   */
  lineIri: string;

  /**
   * Words that are part of the line.
   */
  words: Array<PageTreeWord>;
}

/**
 * A word as a part of a transcription with regions.
 */
export interface PageTreeWord {

  /**
   * Unique identifier of the word.
   */
  wordIri: string;

  /**
   * Unique identifier of the text content of the word.
   */
  textIri: string;

  /**
   * x-axis of upper left coordinate of the word, in pixels.
   */
  ulx: number;

  /**
   * y-axis of upper left coordinate of the word, in pixels.
   */
  uly: number;

  /**
   * x-axis of lower right coordinate of the word, in pixels.
   */
  lrx: number;

  /**
   * y-axis of lower right coordinate of the word, in pixels.
   */
  lry: number;
}
