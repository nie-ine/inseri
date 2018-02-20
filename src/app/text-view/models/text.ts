import {Person} from '../../shared/models/person';
import {JulianDate} from '../../shared/models/julian-date';
import {Place} from '../../shared/models/place';
import {BasicModel} from '../../shared/models/basic-model';

export class Text extends BasicModel {
  editors: Person[];
  title?: string;
  authors?: Person[];
  text: string;
  date?: JulianDate;
  place?: Place;
}
