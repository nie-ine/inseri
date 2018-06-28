import { Injectable } from '@angular/core';
import { Edition } from '../model/edition.model';
import { HttpClient } from '@angular/common/http';
import {Action} from '../../../shared/models/action';

@Injectable()
export class CreateOrUpdateEditionService {
  constructor(private http: HttpClient) {
  }
  createOrUpdate(
    edition: Edition,
    action: Action
  ) {
    console.log('Create or update edition');
  }
}
