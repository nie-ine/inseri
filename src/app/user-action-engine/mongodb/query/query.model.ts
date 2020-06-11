export interface QueryModel {
  title: string;
  description: string;
  serverUrl: string;
  method: string;
  params: [
    {
      _id: string,
      key: string,
      value: string
    }
  ];
  header: [
    {
      _id: string,
      key: string,
      value: string
    }
  ];
  body: string;
  isBoundToPage: string;
  path: [ string ];
  creator: string;
  published: boolean;
}
