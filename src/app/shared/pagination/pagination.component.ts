import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';
import { Pagination } from './pagination.model';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PaginationComponent implements OnInit {

  @Input() pagination: Pagination = new Pagination();
  @Output() goToNextPage: EventEmitter<number> = new EventEmitter<number>();

  pages: number[];
  nextPage: number = 1;

  constructor() {}

  ngOnInit() {
    $('.ui.dropdown.pagination').dropdown(
      'setting', 'onChange', () => {
        this.nextPage = $('.ui.dropdown.pagination').dropdown('get value');
        this.updatePagination();
      }
    );

    this.updatePageList();
  }

  updatePageList() {
    this.pages = [];
    for (var _i = 0; _i < this.pagination.totalPages; _i++) {
      this.pages.push(_i + 1);
    }
  }

  updatePagination() {
    this.updatePageList();
    this.goToNextPage.emit(this.nextPage);
    console.log("selectedPage: " + this.nextPage);
  }

  clickNextPage () {
    if (this.pagination.isLastPage 
      || this.pagination.currentPage >= this.pagination.totalPages) {
      this.nextPage = this.pagination.currentPage;
    } else {
      this.nextPage = Number(this.pagination.currentPage) + 1;
    }
    this.updatePagination();
  }

  clickLastPage () {
    this.nextPage = this.pagination.totalPages;
    this.updatePagination();
  }

  clickPreviousPage () {
    if (this.pagination.isFirstPage || this.pagination.currentPage <= 1) {
      this.nextPage = 1;
    } else {
      this.nextPage = Number(this.pagination.currentPage) - 1;
    }
    this.updatePagination();
  }

  clickFirstPage () {
    this.nextPage = 1;
    this.updatePagination();
  }

}
