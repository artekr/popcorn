import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Entry } from './entry.model';
import { ApiService } from '../../core/api.service';

import { ENTRIES } from "../../mock-entries";

@Injectable()
export class EntryService {

  constructor(
    private apiService: ApiService
  ) {}

  query(): Observable<Entry[]> {
    return of(ENTRIES);
    // return this.apiService.get(
    //   '/entry/hot_entry'
    // );
  }

}
