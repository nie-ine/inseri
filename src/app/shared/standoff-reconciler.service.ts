import { Injectable } from '@angular/core';
import {Standoff} from './models/standoff';

@Injectable()
export class StandoffReconcilerService {

  constructor() { }

  reconcile(editedText: string, standoff?: Standoff): string {
    if (standoff) {
      // TODO: Do the reconciliation
      return null;
    }
    return editedText;
  }

}

