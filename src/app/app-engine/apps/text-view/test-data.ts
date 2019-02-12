import {Text} from './models/text';
import {Person} from '../models/person';
import {Place} from '../models/place';

const editor: Person = {
  firstname: 'Editor First Name',
  name: 'Editor Name'
};

const author: Person = {
  firstname: 'Author First Name',
  name: 'Author Name'
}

const place: Place = {
  label: 'Place Name'
};

export const text: Text = {
  editors: [editor],
  title: 'Lorem ipsum',
  authors: [author],
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula, turpis vitae condimentum facilisis, leo nisi lacinia mauris, id hendrerit enim risus id metus. Etiam at semper nunc, a iaculis metus. Maecenas enim metus, volutpat ac orci id, tempor mattis ligula. Ut at nisi sed sem varius ultrices. Nunc tincidunt odio nec tempus interdum. Maecenas quis ante metus. Suspendisse interdum sollicitudin sodales. Aenean urna ante, iaculis vel massa ut, suscipit aliquet turpis. Duis enim nunc, viverra quis imperdiet non, dignissim in lectus. Praesent elit nisi, condimentum non viverra et, feugiat in diam. Mauris non commodo ligula. Nulla at mollis tortor. Ut malesuada ligula ac urna sagittis, nec consequat risus accumsan. Donec scelerisque lacinia fermentum. Quisque vitae ultricies est. Nullam fermentum purus a risus rutrum, in condimentum augue pretium. Praesent vehicula facilisis neque, eu ullamcorper nisl accumsan a. Praesent condimentum rutrum mollis. Nullam accumsan molestie sem, at fermentum magna tristique non. Donec orci libero, ultricies sed consectetur a, eleifend ut ligula. Suspendisse condimentum dapibus fringilla. Sed ornare tortor vel enim posuere, sit amet accumsan enim malesuada. Nunc volutpat volutpat blandit. Nam a nisl nec velit scelerisque sodales in sed metus. Etiam finibus commodo turpis, sed feugiat sapien ultricies nec. Suspendisse potenti. Cras bibendum egestas feugiat. Ut ac libero mattis, congue libero a, egestas libero. Aenean ac diam vestibulum, sagittis dolor vel, posuere nisl. Ut porta commodo mattis. Maecenas a placerat lectus, sit amet posuere erat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla facilisi. Donec eu venenatis magna. Sed ex libero, feugiat eget nibh a, ultricies dapibus nisl. Morbi posuere augue id ante tincidunt dapibus. Sed semper fermentum nulla eget molestie. Mauris vitae vestibulum nulla. Nullam ultricies sollicitudin elementum.',
  place: place,
  date: '01.01.1800'
};
