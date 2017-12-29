import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Entry } from '../../entries';
import { ENTRIES } from "../../mock-entries";
import { Pagination, Message, MESSAGE_TYPE } from '../../shared';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
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
  entries: Array<Entry>  = new Array<Entry>();
  pagination: Pagination;
  message: Message = new Message();

  constructor(private http: HttpClient, 
              private apiService: ApiService) { }

  ngOnInit() {
    let headers = this.apiService.setHeaders();
    const params = new HttpParams()
      .set('create_user_id', '8')
      .set('sort', 'createTime,desc');

    this.http.get<Array<Entry>>(environment.api_url + "/entries", { headers, params })
      .subscribe(
      response => {
        this.entries = response;
        if (this.entries.length <= 0) {
          this.message.content = "没有查询到任何词条.";
          this.message.type = MESSAGE_TYPE.ERROR;
          // this.alertService.console.warn("", "没有查询到任何词条.");
        }
      },
      (err: HttpErrorResponse) => {
        this.message.content = err.error.error_message;
        this.message.type = MESSAGE_TYPE.ERROR;
      },
    );
  }
}
