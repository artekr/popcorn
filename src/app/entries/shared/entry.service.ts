import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Entry } from './entry.model';
import { ENTRIES } from '../../mock-entries';

@Injectable()
export class EntryService {

  private hotEntriesUrl = 'http://13.124.84.160:4321/entry/hot_entry';

  constructor(private http: HttpClient) { }

  query(): Observable<Entry[]> {
    return this.http.get<Entry[]>(this.hotEntriesUrl);
  }

}
