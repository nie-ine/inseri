// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  name: 'nieOS',
  api: 'http://localhost:3333',
  app: 'http://localhost:4200',
  media: 'http://localhost:1024',
  node: 'http://localhost:3000',
  sparqlVisualizer: 'http://localhost:5200',
  salsah2: 'http://salsah2.nie-ine.ch/',
  raeber: 'http://raeber.nie-ine.ch/',
  webern: 'https://edition.anton-webern.ch/',
  jsonEnvironment: 'http://localhost:8080/json-task'
};
