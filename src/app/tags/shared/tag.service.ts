import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Entry } from '../../entries';
import { ApiService } from '../../core/api.service';
import { Tag } from './tag.model';

import { HttpParams } from '@angular/common/http';

declare var $: any;

@Injectable()
export class TagService {
  defaultPageSize: number = 10;

  constructor(
    private apiService: ApiService
  ) {}

  queryHotTags(): Observable<Entry[]> {
    return this.apiService.get('/tags/hot_tags');
  }

  queryEntriesByTagId(tag_id: number, page: number): Observable<Entry[]> {
    const params = new HttpParams()
      .set('page', page + '')
      .set('size', this.defaultPageSize + '');
    return this.apiService.get('/entries/tags/' + String(tag_id) + '/pagination', params);
  }

  queryRelatedTagsById(tag_id: number): Observable<Tag[]> {
    return this.apiService.get('/tags/related_tags/' + String(tag_id));
  }

}
