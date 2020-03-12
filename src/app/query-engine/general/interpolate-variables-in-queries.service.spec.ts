import { TestBed } from '@angular/core/testing';

import { InterpolateVariablesInQueriesService } from './interpolate-variables-in-queries.service';

describe('InterpolateVariablesInQueriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InterpolateVariablesInQueriesService = TestBed.get(InterpolateVariablesInQueriesService);
    expect(service).toBeTruthy();
  });

  it('should ignore empty fields in the variable array', () => {
    const query = 'PREFIX foaf: <http://xmlns.com/foaf/0.1/>\n' +
      'SELECT ?name \n' +
      '       ?email\n' +
      'WHERE\n' +
      '  {\n' +
      '    §§+person-§§  a          foaf:Person .\n' +
      '    §§+person-§§  foaf:name  ?name .\n' +
      '    §§+person-§§  foaf:mbox  ?email .\n' +
      '  }';
    const variables = [['person']];
    const newQuery = InterpolateVariablesInQueriesService.interpolateVariables(query, variables);
    const result = 'PREFIX foaf: <http://xmlns.com/foaf/0.1/>\n' +
      'SELECT ?name \n' +
      '       ?email\n' +
      'WHERE\n' +
      '  {\n' +
      '    §§+person-§§  a          foaf:Person .\n' +
      '    §§+person-§§  foaf:name  ?name .\n' +
      '    §§+person-§§  foaf:mbox  ?email .\n' +
      '  }';
    expect(newQuery).toBe(result);
  });

  it('should replace the variable with the values in the fields in the variable array', () => {
    const query = 'PREFIX foaf: <http://xmlns.com/foaf/0.1/>\n' +
      'SELECT ?name \n' +
      '       ?email\n' +
      'WHERE\n' +
      '  {\n' +
      '    §§+person-§§  a          foaf:Person .\n' +
      '    §§+person-§§  foaf:name  ?name .\n' +
      '    §§+person-§§  foaf:mbox  ?email .\n' +
      '  }';
    const variables = [['person', '<http://data.example.com/my#Resource>']];
    const newQuery = InterpolateVariablesInQueriesService.interpolateVariables(query, variables);
    const result = 'PREFIX foaf: <http://xmlns.com/foaf/0.1/>\n' +
      'SELECT ?name \n' +
      '       ?email\n' +
      'WHERE\n' +
      '  {\n' +
      '    <http://data.example.com/my#Resource>  a          foaf:Person .\n' +
      '    <http://data.example.com/my#Resource>  foaf:name  ?name .\n' +
      '    <http://data.example.com/my#Resource>  foaf:mbox  ?email .\n' +
      '  }';
    expect(newQuery).toBe(result);
  });

  it('should replace several variables with the values in the fields in the variable array', () => {
    const query = 'PREFIX foaf: <http://xmlns.com/foaf/0.1/>\n' +
      'SELECT ?email\n' +
      'WHERE\n' +
      '  {\n' +
      '    <§§+person-§§>  a          foaf:Person .\n' +
      '    <§§+person-§§>  foaf:name  "§§+name-§§" .\n' +
      '    <§§+person-§§>  foaf:mbox  ?email .\n' +
      '  }';
    const variables = [['person', 'http://data.example.com/my#Resource'], ['name', 'Doe']];
    const newQuery = InterpolateVariablesInQueriesService.interpolateVariables(query, variables);
    const result = 'PREFIX foaf: <http://xmlns.com/foaf/0.1/>\n' +
      'SELECT ?email \n' +
      'WHERE\n' +
      '  {\n' +
      '    <http://data.example.com/my#Resource>  a          foaf:Person .\n' +
      '    <http://data.example.com/my#Resource>  foaf:name  "Doe" .\n' +
      '    <http://data.example.com/my#Resource>  foaf:mbox  ?email .\n' +
      '  }';
    expect(newQuery).toBe(result);
  });
});
