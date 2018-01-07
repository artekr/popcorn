import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Entry } from '../../entries';
import { ENTRIES } from "../../mock-entries";
import { Message, MESSAGE_TYPE, Pagination } from '../../shared';
import { HttpParams, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../core';
import { AlertService } from '../../shared/services';
import { JPAPagination } from '../../shared/model';

@Component({
  selector: 'app-my-entries',
  templateUrl: './my-entries.component.html',
  styleUrls: ['./my-entries.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MyEntriesComponent implements OnInit {
  jpaPagination: JPAPagination = new JPAPagination();
  entries: Entry[] = new Array<Entry>();
  pagination: Pagination = new Pagination();
  message: Message = new Message();
  page: number = 0;
  defaultPageSize: number = 3;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.pagination.currentPage = 1;
    this.pagination.totalPages = 6;
  
    this.getEntries ();
  }

  getEntries() {
    const params = new HttpParams()
      .set('create_user_id', '8')
      .set('sort', 'createTime,desc')
      .set('page', (this.page - 1) + '')
      .set('size', this.defaultPageSize + '');

    this.apiService.get("/entries/pagination", params).subscribe(
      response => {
        console.log(response);
        this.jpaPagination = response;
        this.entries = this.jpaPagination.content;

        if (this.entries.length <= 0) {
          this.message.content = "没有查询到任何词条.";
          this.message.type = MESSAGE_TYPE.ERROR;
        }
      },
      (err: HttpErrorResponse) => {
        this.message.content = err.error.error_message;
        this.message.type = MESSAGE_TYPE.ERROR;
      },
      () => {
        this.buildPagination(this.jpaPagination.number, this.jpaPagination.totalPages);
      }
    );
  }

  goNextPage(nextPage: number) {
    this.page = nextPage;
    this.pagination.currentPage = nextPage;
    console.log("my-entries nextPage:" + nextPage);

    this.getEntries ();
  }

  buildPagination (currentPage: number, totalPages: number) {
    
    this.pagination.currentPage = currentPage + 1;
    this.pagination.totalPages = totalPages;

    console.log("buildPagination jpaPagination.number: " + this.jpaPagination.number);
    console.log("buildPagination jpaPagination.totalPages: " + this.jpaPagination.totalPages);
  }
}
