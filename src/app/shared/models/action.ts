export class Action {
  id: number;
  title: string;
  description: string;
  isFinished: boolean; // isInProgress, isFinished
  deleted = false;
  type: string;
  hasView = null;
}
