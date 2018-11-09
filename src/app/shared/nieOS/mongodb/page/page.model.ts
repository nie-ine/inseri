export interface Page {
  title: string;
  description: string;
  linkToImage: string;
  hasPages: Array<string>; // hash der views
  hash: string;
}
