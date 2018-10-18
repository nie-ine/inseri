export interface Action {
  id: number;
  title: string;
  description: string;
  isFinished: boolean; // isInProgress, isFinished
  deleted: boolean;
  type: string;
  hasViews: Array<string>; // hash des views
  hasEdition: string;
}
