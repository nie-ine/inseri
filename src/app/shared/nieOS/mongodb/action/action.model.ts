export interface Action {
  title: string;
  description: string;
  isFinished: boolean; // isInProgress, isFinished
  deleted: boolean;
  type: string;
  hasViews: Array<string>; // hashes of the views
  hasEdition: string;
}
