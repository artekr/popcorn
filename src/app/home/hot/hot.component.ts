import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { JPAPagination } from '../../shared/model';
import { Message, MESSAGE_TYPE, Pagination } from '../../shared';
import { HttpErrorResponse } from '@angular/common/http';

import { 
  Entry,
  EntryService
} from '../../entries';

@Component({
  selector: 'app-hot',
  templateUrl: './hot.component.html',
  styleUrls: ['./hot.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HotComponent implements OnInit {

  // Endpoint return this type, entry list is parameter content.
  jpaPagination: JPAPagination = new JPAPagination();
  private entries: Entry[];

  // For pagination component.
  pagination: Pagination = new Pagination();
  page: number = 0;
  defaultPageSize: number = 10;

  message: Message = new Message();

  constructor(private entryService: EntryService) { }

  ngOnInit() {
    this.getEntries();
  }

  getEntries(): void {
    this.entryService.getHotEntries(this.page - 1) // first page is 0 in stupid JPA. So page need to minus 1. 
    .subscribe(
      response => {
        //The endpoint should return Pagination object
        this.jpaPagination = response;
        this.entries = this.jpaPagination.content;

        if (this.entries.length <= 0) {
          this.message.content = "没有查询到任何词条.";
          this.message.type = MESSAGE_TYPE.ERROR;
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      },
      () => {
        this.updatePagination(this.jpaPagination.number, this.jpaPagination.totalPages);
      }
    );
  }

  // pagination callback method, it will be triggered when click pagination buttons.
  // so retreve new list should be written here.
  goToNextPage(nextPage: number) {
    this.page = nextPage;
    this.pagination.currentPage = nextPage;

    this.getEntries ();
  }

  //pagination should be updated every times refresh the list.
  updatePagination (currentPage: number, totalPages: number) {
    // first page is 0 in fucking stupid JPA. So page need to add 1. 
    this.pagination.currentPage = currentPage + 1;
    this.pagination.totalPages = totalPages;
  }

}
