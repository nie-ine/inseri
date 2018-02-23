export interface SynopsisObjectData {
  readonly dataType: SynopsisObjectType;
  readonly name: string;
  viewRefIndex: number;
  height: number;
  width: number;
  top: number;
  left: number;
}

export enum SynopsisObjectType {
  Text,
  Image
}

export class SynopsisTextData implements SynopsisObjectData {
  readonly dataType: SynopsisObjectType;
  readonly name: string;
  readonly htmlText: string;

  viewRefIndex = -1;
  height: number;
  width: number;
  top: number;
  left: number;

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

  viewRefIndex = -1;
  height: number;
  width: number;
  top: number;
  left: number;

  constructor(name: string, src: string) {
    this.dataType = SynopsisObjectType.Image;
    this.name = name;
    this.src = src;
  }
}
