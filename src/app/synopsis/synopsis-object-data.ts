export interface SynopsisObjectData {
  dataType: string;
  name: string;
  height?: string;
  width?: string;
}

export class SynopsisTextData implements SynopsisObjectData {
  dataType = 'text';
  htmlText: string;
  name: string;
  height: string | undefined;
  width: string | undefined;

  constructor(name: string, htmlText: string, height?: string, width?: string) {
    this.name = name;
    this.htmlText = htmlText;
    this.height = height;
    this.width = width;
  }
}

export class SynopsisImageData implements SynopsisObjectData {
  dataType = 'image';
  src: string;
  name: string;
  height: string | undefined;
  width: string | undefined;

  constructor(name: string, src: string, height?: string, width?: string) {
    this.name = name;
    this.src = src;
    this.height = height;
    this.width = width;
  }
}
