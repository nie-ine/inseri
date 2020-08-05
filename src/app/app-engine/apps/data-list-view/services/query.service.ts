import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class QueryService {
  constructor(private http: HttpClient) {
  }

  // prefixes and namespaces for shrinking iri's to the enduser
  // TODO: move namespaces to a file and read it in
  namespaces = {
    data: 'http://rdfh.ch/projects/0068#',
    owl: 'http://www.w3.org/2002/07/owl#',
    rdfs: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
    tln: 'http://www.nie.org/ontology/nietzsche#',
  };

  baseUrl = 'http://fuseki.nie-ine.ch/nietzsche-rw/query';

  /**
   * Gets the data from an endpoint via http post
   *
   * @param query:  The query to run.
   * @param queryType: "CONSTRUCT" or "QUERY"
   * @returns the response.
   */
  public getData(query: string, queryType?: string) {

    let httpOptions;
    if (queryType === 'CONSTRUCT') {
      //  A construct does contain a text as response, not a json, so responseType must be 'text' to avoid parse errors
      httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/sparql-query', 'Accept': 'text/turtle'}),
        responseType: 'text'
      };
      return this.http.post(this.baseUrl, query, httpOptions);
    } else {
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/sparql-query',
          'Accept': 'application/sparql-results+json; charset=UTF-8'
        })
      };
    }

    if (this.baseUrl && httpOptions.headers && (query === undefined || query === null || query === '')) {
      console.log('fallback to static query as there is no query passed');
      this.getQueryfromFilename('fallbackQuery.rq').subscribe(fallbackQuery => {
        console.log('fallbackQuery: ', fallbackQuery);
        return this.http.post(this.baseUrl, query, httpOptions);
      });
    } else {
      return this.http.post(this.baseUrl, query, httpOptions);
    }
  }

  /**
   * Shrinks an iri according to the defined prefixes/namespaces.
   *
   * @param iri  The iri to be shrunken.
   * @returns shrunkIri: the shrunken iri if it can be shrunken.
   */
  public shrink_iri(iri) {
    let shrunkIri: string;
    Object.keys(this.namespaces).forEach((ns, index) => {
      // console.log(this.namespaces[ns] + ' key ' + ns )
      if (iri.includes(this.namespaces[ns])) {
        shrunkIri = iri.replace(this.namespaces[ns], ns + ':');
      }
    });

    if (shrunkIri) {
      return shrunkIri;
    } else {
      return iri;
    }
  }

  /**
   * Gets a text file by its name from the directory assets/queries.
   *
   * @param filename  The name of the file + file name extension.
   * @returns the text of the file.
   */
  public getQueryfromFilename(filename) {
    return this.http.get('../assets/queries/' + filename, {responseType: 'text'});
  }
}

