import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class KnoraV2RequestService {

  constructor(private httpClient: HttpClient) { }

}
