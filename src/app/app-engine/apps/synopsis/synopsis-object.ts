import {SynopsisObjectData} from './synopsis-object-data';

export interface SynopsisObject {
  // TODO: The components who implements the interface should eventually be able to get data from backend.
  data: SynopsisObjectData;
}
