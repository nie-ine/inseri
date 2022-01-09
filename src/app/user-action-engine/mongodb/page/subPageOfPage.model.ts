import {Page} from './page.model';

export interface SubPageOfPageModel {
  page: Page;
  subPages?: SubPageOfPageModel[];
}
