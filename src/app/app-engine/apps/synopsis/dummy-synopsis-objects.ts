import { SynopsisImageData, SynopsisObjectData, SynopsisTextData } from './synopsis-object-data';

export const DUMMYSYNOPSISOBJECTS: SynopsisObjectData[] = [
  new SynopsisTextData('1', 'A text', '<h3>A title...</h3><p>...with a text in <i>italic</i> and <b>bold</b>'),
  new SynopsisTextData('2', 'Another text',
    '<h3 style="color:red">Fancy title</h3><p style="text-decoration: underline wavy blue">A fancy text</p>'),
  new SynopsisImageData('3', 'Team member #1', '../../../assets/img/team/1.jpg'),
  new SynopsisImageData('4', 'Team member #2', '../../../assets/img/team/2.jpg'),
  new SynopsisImageData('5', 'Team member #3', '../../../assets/img/team/3.jpg'),
  new SynopsisImageData('6', 'El capitán', '../../../assets/img/about/1.jpg'),
  new SynopsisImageData('7', 'A plane', '../../../assets/img/about/2.jpg'),
  new SynopsisImageData('8', 'A laptop', '../../../assets/img/about/3.jpg'),
  new SynopsisImageData('9', 'Mountains', '../../../assets/img/about/4.jpg')
];
