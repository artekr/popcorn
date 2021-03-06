import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Entry } from './entry.model';
import { ApiService } from '../../core/api.service';

import { ENTRIES } from "../../mock-entries";

import { HttpParams } from '@angular/common/http';
declare var $: any;
@Injectable()
export class EntryService {

  defaultPageSize: number = 10;

  constructor(
    private router: Router,
    private apiService: ApiService,
  ) { }

  query(type: string): Observable<Entry[]> {
    // return of(ENTRIES);
    return this.apiService.get('/entries/' + type);
  }

  getRandomEntries() {
    const params = new HttpParams()
      .set('page', '0')
      .set('size', '3');
    return this.apiService.get('/entries/random_entries', params);
  }

  getLatestEntries(page: number) {
    const params = new HttpParams()
      .set('page', page + '')
      .set('size', this.defaultPageSize + '');
    return this.apiService.get('/entries/latest_entries/pagination', params);
  }

  getHotEntries(page: number) {
    const params = new HttpParams()
      .set('page', page + '')
      .set('size', this.defaultPageSize + '');
    return this.apiService.get('/entries/hot_entries/pagination', params);
  }

  queryEntriesByName(name: string): Observable<Entry[]> {
    return this.apiService.get('/entries?name=' + name);
  }

  submitEntry(entry: object = {}) {
    this.apiService.post('/entries', entry)
      .subscribe(
      data => {
        console.log(data);
        $('#addEntry-modal').modal('hide');
        //TODO: Refresh the current page
        this.router.navigateByUrl('/');
      },
      error => {
        console.log("error " + error);
      }
      );
  }

  upVoteEntry(entry_id: number): Observable<any> {
    return this.apiService.post('/entries/' + String(entry_id) + '/up_votes');
  }

  downVoteEntry(entry_id: number): Observable<any> {
    return this.apiService.post('/entries/' + String(entry_id) + '/down_votes');
  }

  queryRelatedEntriesByName(entry_name: string): Observable<Entry[]> {
    return this.apiService.get('/entries/related_entries/' + entry_name + '/pagination');
  }

}
