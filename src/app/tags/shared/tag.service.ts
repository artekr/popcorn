import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Entry } from '../../entries';
import { ApiService } from '../../core/api.service';

declare var $: any;

@Injectable()
export class TagService {

  constructor(
    private apiService: ApiService
  ) {}

  queryEntriesByTagId(tag_id: number): Observable<Entry[]> {
    return this.apiService.get('/entries/tags/' + String(tag_id));
  }


}