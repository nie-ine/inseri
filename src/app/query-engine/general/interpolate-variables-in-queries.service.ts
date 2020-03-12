import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InterpolateVariablesInQueriesService {

  constructor() { }

  /**
   * Replaces an escaped mention of a variable in a query with an associated value.
   * The variable names are escaped with `§§+` `-§§`
   * @param query  A query with variables to interpolate.
   * @param variables  An array of variable definition where the field 0 contains the variable name and field 1 the value to be inserted.
   */
  static interpolateVariables(query: string, variables: string[][]): string {
    let newQuery = query;

    for (const v in variables) {
      if (v.length > 1) {
        const escapeSequence = '§§+' + v[0] + '-§§';
        if (query.match(escapeSequence)) {
          newQuery = newQuery.split(escapeSequence).join(v[1]);
        } else {
          console.log('InterpolateVariablesInQueriesService: Variable ' + v[0] + ' could not be replaced');
        }
      } else {
        console.log('InterpolateVariablesInQueriesService: Empty field in variables');
      }
    }
    if (newQuery.match('§§+') || newQuery.match('-§§')) {
      console.log('InterpolateVariablesInQueriesService: Unreplaced escape sequence');
    }
    // TODO: error handling

    return newQuery;
  }
}
