export interface PageTree {
  pageId: string;
  pageHeight: number;
  pageWidth: number;
  lines: Array<PageTreeLine>;
}

export interface PageTreeLine {
  lineId: string;
  lineIri: string;
  words: Array<PageTreeWord>;
}

export interface PageTreeWord {
  wordIri: string;
  textIri: string;
  ulx: number;
  uly: number;
  lrx: number;
  lry: number;
}
