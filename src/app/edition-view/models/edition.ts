import {Person} from '../../shared/models/person';
import {JulianDate} from '../../shared/models/julian-date';
import {Place} from '../../shared/models/place';
import {BasicModel} from '../../shared/models/basic-model';

export class Edition extends BasicModel {
  editor: Person[];
  title?: string;
  text: string;
  date?: JulianDate;
  place?: Place;
}
