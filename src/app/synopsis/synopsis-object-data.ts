export interface SynopsisObjectData {
  readonly dataType: SynopsisObjectType;
  readonly name: string;

  uid: number;
  top: number;
  left: number;
  height: number;
  width: number;
  rotation: number;
}

export enum SynopsisObjectType {
  Text,
  Image
}

export class SynopsisTextData implements SynopsisObjectData {
  readonly dataType: SynopsisObjectType;
  readonly name: string;
  readonly htmlText: string;

  uid: number;
  top: number;
  left: number;
  height = 400;
  width = 300;
  rotation = 0;

  constructor(name: string, htmlText: string) {
    this.dataType = SynopsisObjectType.Text;
    this.name = name;
    this.htmlText = htmlText;
  }

}

export class SynopsisImageData implements SynopsisObjectData {
  readonly dataType: SynopsisObjectType;
  readonly name: string;
  readonly src: string;

  uid: number;
  top: number;
  left: number;
  height: number;
  width: number;
  rotation = 0;

  constructor(name: string, src: string) {
    this.dataType = SynopsisObjectType.Image;
    this.name = name;
    this.src = src;
  }
}
