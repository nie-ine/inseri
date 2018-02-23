export interface SynopsisObjectData {
  dataType: string;
  name: string;
  height?: string;
  width?: string;
  top?: number;
  left?: number;
}

export class SynopsisTextData implements SynopsisObjectData {
  dataType = 'text';
  htmlText: string;
  name: string;
  height: string | undefined;
  width: string | undefined;
  top: number | undefined;
  left: number | undefined;

  constructor(name: string, htmlText: string, height?: string, width?: string, top?: number, left?: number) {
    this.name = name;
    this.htmlText = htmlText;
    this.height = height;
    this.width = width;
    this.top = top;
    this.left = left;
  }
}

export class SynopsisImageData implements SynopsisObjectData {
  dataType = 'image';
  src: string;
  name: string;
  height: string | undefined;
  width: string | undefined;
  top: number | undefined;
  left: number | undefined;

  constructor(name: string, src: string, height?: string, width?: string, top?: number, left?: number) {
    this.name = name;
    this.src = src;
    this.height = height;
    this.width = width;
    this.top = top;
    this.left = left;
  }
}
