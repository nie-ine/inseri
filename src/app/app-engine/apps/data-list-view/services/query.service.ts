import { Injectable } from '@angular/core';
import { Parser, Generator, Wildcard } from 'sparqljs';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable()
export class QueryService {
  constructor(private http: HttpClient) {
  }

  parser = new Parser();
  sparqlGenerator = new Generator({});

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
  public getData(query: string, queryType?: string ) {

    let httpOptions;
    if (queryType === 'CONSTRUCT') {
      //  A construct does contain a text as response, not a json, so responseType must be 'text' to avoid parse errors
        httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/sparql-query', 'Accept': 'text/turtle'}),
                        responseType: 'text'};
        return this.http.post(this.baseUrl, query, httpOptions);
    } else { httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/sparql-query',
                                                                'Accept': 'application/sparql-results+json; charset=UTF-8'})};
    }

    if (this.baseUrl && httpOptions.headers && (query === undefined || query === null || query === '') ) {
      console.log('fallback to static query as there is no query passed');
      this.getQueryfromFilename('fallbackQuery.rq' ).subscribe(fallbackQuery => {
        console.log('fallbackQuery: ', fallbackQuery);
        return this.http.post(this.baseUrl, query, httpOptions);
      });
    } else { return this.http.post(this.baseUrl, query, httpOptions); }
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
        shrunkIri =  iri.replace(this.namespaces[ns], ns + ':' );
      }
    });

    if (shrunkIri) { return shrunkIri; } else {return iri; }
  }

  /**
   * Gets all the properties and connected resources of one thing. Gets it depending on its type or role:
   * if the thing is a property, it gets all connected ?s and ?o;
   * if it's usage as subject is of interest, it gets all ?p and ?o;
   * if it's usage as object is of interest, it gets all ?s ?p;
   *
   * @param iri:  The iri of the selected resource
   * @param resourceType: the type of usage i.e. as ?s, ?p or ?o
   * @returns the query for the resource.
   */
  public getQueryforResourceData(iri: string, resourceType?: string) {
    const parsedQuery = this.parser.parse('SELECT ?s ?p ?o WHERE { ?s ?p ?o }');
    // reset the subject iri to the word's iri we like to query for
    const resource =  {'termType': 'NamedNode', 'value': decodeURI(iri) };
    switch (resourceType) {
      case 'subject': {
        parsedQuery.where[0].triples[0].subject = resource;
        break; }
      case 'predicate': {
        parsedQuery.where[0].triples[0].predicate = resource;
        break; }
      case 'object': {
        parsedQuery.where[0].triples[0].object = resource;
        break; }
    }

    // generate the new query string and return it
    return this.sparqlGenerator.stringify(parsedQuery);
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

  /**
   * Gets a query string from a given file in the directory assets/queries.
   *
   * @param filename  The name of the file + file name extension.
   * @returns The JSON equivalence of the parsed query.
   */
  public parseQueryFromFile(filename) {
    return this.getQueryfromFilename(filename )
      .subscribe(query => {
        this.parser.parse(query);
      } );
  }

  private setWhereIri(query, index, iri) {
    if (query.queryType === 'CONSTRUCT') {
      query.where[index].patterns[0].triples[0].subject.id = iri;
    } else { query = '';
    }
    return query;
  }
}


