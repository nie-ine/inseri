import { SynopsisImageData, SynopsisObjectData, SynopsisTextData } from './synopsis-object-data';

export const DUMMYSYNOPSISOBJECTS: SynopsisObjectData[] = [
  new SynopsisTextData('A text', '<h3>A title...</h3><p>...with a text in <i>italic</i> and <b>bold</b>'),
  new SynopsisTextData('Another text',
    '<h3 style="color:red">Fancy title</h3><p style="text-decoration: underline wavy blue">A fancy text</p>'),
  new SynopsisImageData('Team member #1', '../../../assets/img/team/1.jpg'),
  new SynopsisImageData('Team member #2', '../../../assets/img/team/2.jpg'),
  new SynopsisImageData('Team member #3', '../../../assets/img/team/3.jpg'),
  new SynopsisImageData('El capitán', '../../../assets/img/about/1.jpg'),
  new SynopsisImageData('A plane', '../../../assets/img/about/2.jpg'),
  new SynopsisImageData('A laptop', '../../../assets/img/about/3.jpg'),
  new SynopsisImageData('Mountains', '../../../assets/img/about/4.jpg')
];
