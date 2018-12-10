import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneratePathService {

  constructor() { }

  generatePath( hash: string, tree: any ) {
    console.log( 'Generate Path for', hash, tree );
    return hash;
  }

}
