import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Entry } from './entry.model';
import { ENTRIES } from '../../mock-entries';

@Injectable()
export class EntryService {

  constructor() { }

  query(): Observable<Entry[]> {
    return of(ENTRIES);
  }

}
