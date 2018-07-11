import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * This service deals with requests to the Knora V2 API and centralizes parameters for it.
 */
@Injectable()
export class KnoraV2RequestService {

  constructor(private httpClient: HttpClient) { }

}
