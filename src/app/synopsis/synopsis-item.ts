import {Type} from '@angular/core';
import {SynopsisObjectData} from './synopsis-object-data';

export class SynopsisItem {
  constructor(public component: Type<any>, public data: SynopsisObjectData) {}
}
