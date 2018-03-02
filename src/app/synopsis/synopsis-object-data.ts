export interface SynopsisObjectData {
  readonly id: string;
  readonly dataType: SynopsisObjectType;
  readonly name: string;

  uid: number;
  top: number;
  left: number;
  height: number;
  width: number;
  transform: number;
  invertedColors: boolean;
}

export enum SynopsisObjectType {
  Text,
  Image
}

export class SynopsisTextData implements SynopsisObjectData {
  readonly id: string;
  readonly dataType: SynopsisObjectType;
  readonly name: string;
  readonly htmlText: string;

  uid: number;
  top = 0;
  left = 0;
  height: number;
  width: number;
  transform: number;
  invertedColors: boolean;

  constructor(id: string, name: string, htmlText: string) {
    this.id = id;
    this.dataType = SynopsisObjectType.Text;
    this.name = name;
    this.htmlText = htmlText;
  }

}

export class SynopsisImageData implements SynopsisObjectData {
  readonly id: string;
  readonly dataType: SynopsisObjectType;
  readonly name: string;
  readonly src: string;

  uid: number;
  top = 0;
  left = 0;
  height: number;
  width: number;
  transform: number;
  invertedColors: boolean;

  constructor(id: string, name: string, src: string) {
    this.id = id;
    this.dataType = SynopsisObjectType.Image;
    this.name = name;
    this.src = src;
  }
}
