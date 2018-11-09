export interface Action {
  id: string;
  title: string;
  description: string;
  isFinished: boolean; // isInProgress, isFinished
  deleted: boolean;
  type: string;
  hasPages: Array<string>; // hashes of the pages
  hasPageSet: string;
}

export interface ActionArray extends Array<Action> {}
