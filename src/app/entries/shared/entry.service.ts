import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Entry } from './entry.model';
import { ApiService } from '../../core/api.service';

import { ENTRIES } from "../../mock-entries";
declare var $: any;
@Injectable()
export class EntryService {

  constructor(
    private router    : Router,
    private apiService: ApiService,
  ) {}

  query(type: string): Observable<Entry[]> {
    // return of(ENTRIES);
    return this.apiService.get('/entries/' + type);
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

  upVoteEntry(entry_id: number) {
    this.apiService.post('/entries/' + String(entry_id) + '/up_votes')
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log("error " + error);
        }
      );
  }

  downVoteEntry(entry_id: number) {
    this.apiService.post('/entries/' + String(entry_id) + '/down_votes')
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log("error " + error);
        }
      );
  }

}
