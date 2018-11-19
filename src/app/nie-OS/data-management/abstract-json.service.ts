import {HttpClient} from '@angular/common/http';
import {Action} from '../../shared/nieOS/mongodb/action/action.model';
import {Observable} from 'rxjs';

export class AbstractJsonService {
  abstractTree: any = {};
  constructor(
  ) {}

  json2abstract( json: any ) {
    console.log( json );
    console.log( 'Iterate through whole json' );
    this.leafLoop( json );
  }

  leafLoop ( tree: any ) {
    for ( const leaf in tree ) {
      console.log( tree[ leaf ] );
      this.arrayLoop( tree[ leaf ] );
    }
  }

  arrayLoop ( array: any ) {
    for ( const entry of array ) {

      for ( const leaf in entry ) {
        console.log( leaf );
        if( typeof entry[ leaf ] === 'object' &&  entry[ leaf ] !== null ) {
          this.arrayLoop( entry[ leaf ] );
        }
      }
    }
  }

}
