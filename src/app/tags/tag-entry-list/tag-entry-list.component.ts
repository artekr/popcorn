import { Component, OnInit, OnDestroy, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Entry } from '../../entries';
import { TagService } from '../shared/tag.service';
import { SharedService } from '../../shared';

import { JPAPagination } from '../../shared/model';
import { Message, MESSAGE_TYPE, Pagination } from '../../shared';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-tag-entry-list',
  templateUrl: './tag-entry-list.component.html',
  styleUrls: ['./tag-entry-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TagEntryListComponent implements OnInit, OnDestroy {

  private tag_name: string;
  private entries : Entry[];
  private sub     : any;

  // Endpoint return this type, entry list is parameter content.
  jpaPagination: JPAPagination = new JPAPagination();

  // For pagination component.
  pagination: Pagination = new Pagination();
  page: number = 0;
  defaultPageSize: number = 10;

  message: Message = new Message();

  constructor(
    private route        : ActivatedRoute,
    private tagService   : TagService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.getEntries();
  }

  getEntries(): void {
    this.sub = this.route.params.subscribe(params => {
      var tag_id = +params['id']; // (+) converts string 'id' to a number
      this.tagService.queryEntriesByTagId(tag_id, this.page - 1)
      .subscribe(
        response => {
          this.tag_name = response['requestParameters']['name'];
          this.jpaPagination = response['data'];
          this.entries = this.jpaPagination.content;
          this.sharedService.emitTagId(response['requestParameters']['id']);

          if (this.entries.length <= 0) {
            this.message.content = "没有查询到任何词条.";
            this.message.type = MESSAGE_TYPE.ERROR;
          }
        },
        error => {
          // TODO: error handling
          console.log("error " + error);
        },
        () => {
          this.updatePagination(this.jpaPagination.number, this.jpaPagination.totalPages);
        }
      );
   });
  }

  ngOnDestroy() {
    if(this.sub != null) {
      this.sub.unsubscribe();
    }
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
