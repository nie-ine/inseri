export interface Action {
  id: string;
  title: string;
  description: string;
  isFinished: boolean; // isInProgress, isFinished
  deleted: boolean;
  type: string;
  hasPage: Array<string>; // hashes of the pages
  hasPageSet: string  | any;
  creator: string;
}

export interface ActionArray extends Array<Action> {}
