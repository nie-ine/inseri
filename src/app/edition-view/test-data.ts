import {Edition} from './models/edition';
import {Person} from '../shared/models/person';
import {Place} from '../shared/models/place';

const editor: Person = {
  firstname: 'Pinco',
  name: 'Pallino'
};

const author: Person = {
  firstname: 'Tizio',
  name: 'Sempronio'
}

const place: Place = {
  label: 'Mendrisio'
};

export const edition: Edition = {
  editors: [editor],
  title: 'Titolo',
  authors: [author],
  text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
  place: place,
  date: '01.01.1800'
};
