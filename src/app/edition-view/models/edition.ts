import {Person} from '../../shared/models/person';
import {JulianDate} from '../../shared/models/julian-date';
import {Place} from '../../shared/models/place';
import {EditedText} from './edited-text';
import {BasicModel} from '../../shared/models/basic-model';

export class Edition extends BasicModel {
  editor: Person[];
  title?: string;
  text: EditedText;
  date?: JulianDate;
  place?: Place;
}
