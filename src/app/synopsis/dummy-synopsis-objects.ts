import { SynopsisImageData, SynopsisObjectData, SynopsisTextData } from './synopsis-object-data';

export const DUMMYSYNOPSISOBJECTS: SynopsisObjectData[] = [
  new SynopsisTextData('A text', '<h3>A title...</h3><p>...with a text in <i>italic</i> and <b>bold</b>'),
  new SynopsisImageData('A plane', '../../../assets/img/about/2.jpg')
];
