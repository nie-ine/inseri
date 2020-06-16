export interface Folder {
  id: string;
  title: string;
  owner: string;
  hasParent: string;
  hasQueries: [string];
  hasPageSets: [{_id: string, title: string, actionId: string}];
  hasPages: [string];
  hasFiles: [string];
}
