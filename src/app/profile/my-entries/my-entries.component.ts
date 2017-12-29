import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Entry } from '../../entries';
import { ENTRIES } from "../../mock-entries";
import { Pagination, Message, MESSAGE_TYPE } from '../../shared';
import { HttpParams, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../core';
import { AlertService } from '../../shared/services';

@Component({
  selector: 'app-my-entries',
  templateUrl: './my-entries.component.html',
  styleUrls: ['./my-entries.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MyEntriesComponent implements OnInit {
  entries: Entry[] = new Array<Entry>();
  pagination: Pagination;
  message: Message = new Message();
  page: number = 1;
  defaultPageSize: number = 3;

  array = [];


  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.appendEntries ();
    this.page++;
  }

  appendEntries() {
    const params = new HttpParams()
      .set('create_user_id', '8')
      .set('sort', 'createTime,desc')
      .set('page', this.page + '')
      .set('size', this.defaultPageSize + '');

    this.apiService.get("/entries", params).subscribe(
      response => {
        console.log(response);
        this.entries = this.entries.concat(response);
        if (this.entries.length <= 0) {
          this.message.content = "没有查询到任何词条.";
          this.message.type = MESSAGE_TYPE.ERROR;
        }
      },
      (err: HttpErrorResponse) => {
        this.message.content = err.error.error_message;
        this.message.type = MESSAGE_TYPE.ERROR;
      },
    );
  }

  onScroll() {
    this.appendEntries();
    this.page++;
    console.log('scrolled!!');
  }
}
