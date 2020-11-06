//import {Page} from './page.model';
import {Page} from '../../../../../backend/models/page.js';

export interface SubPageOfPageModel {
  page: Page;
  subPages?: SubPageOfPageModel[];
}
