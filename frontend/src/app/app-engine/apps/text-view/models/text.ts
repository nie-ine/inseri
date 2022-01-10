import {Person} from '../../models/person';
import {JulianDate} from '../../models/julian-date';
import {Place} from '../../models/place';
import {BasicModel} from '../../models/basic-model';

export class Text extends BasicModel {
  editors: Person[];
  title?: string;
  authors?: Person[];
  text: string;
  date?: JulianDate;
  place?: Place;
}
