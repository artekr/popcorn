import { Component, OnChanges, ViewEncapsulation, Input, Output, EventEmitter, SimpleChanges} from '@angular/core';
import { Pagination } from './pagination.model';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PaginationComponent implements OnChanges {

  @Input() pagination: Pagination = new Pagination();
  @Output() goToNextPage: EventEmitter<number> = new EventEmitter<number>();

  nextPage: number = 1;
  disabledPagination: boolean = true;

  showPaginationComponent: boolean = true;
  showFrontDots: boolean = false;
  showRearDots: boolean = false;
  showPreviousPage: boolean = false;
  showNextPage: boolean = false;
  showLastPage: boolean = false;
  showFirstPage: boolean = false;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    // changes['pagination'].currentValue;
  }

  ngDoCheck() {
    this.updateButtons();
  }

  ngOnInit() {
  }

  updateButtons () {
    let lastPage: number = this.pagination.totalPages;
    let currentPage: number = this.pagination.currentPage;
    
    if (lastPage - currentPage > 1) {
      this.showLastPage = true;
    } else {
      this.showLastPage = false;
    }

    if (lastPage - currentPage > 2) {
      this.showRearDots = true;
    } else {
      this.showRearDots = false;
    }

    if (lastPage - currentPage > 0) {
      this.showNextPage = true;
    } else {
      this.showNextPage = false;
    }

    if (currentPage > 2) {
      this.showPreviousPage = true;
    } else {
      this.showPreviousPage = false;
    }

    if (currentPage > 3) {
      this.showFrontDots = true;
    } else {
      this.showFrontDots = false;
    }

    if (currentPage > 1) {
      this.showFirstPage = true;
    } else {
      this.showFirstPage = false;
    }
  }

  varifyPagination () {
    if (this.pagination.currentPage <= 0) {

    }

    if (this.pagination.totalPages <= 0) {

    }

    if (this.pagination.currentPage == 1) {
      this.pagination.isFirstPage = true;
    } else {
      this.pagination.isFirstPage = false;
    }

    if (this.pagination.currentPage == this.pagination.totalElements) {
      this.pagination.isLastPage = true;
    } else {
      this.pagination.isLastPage = false;
    }
  }

  clickFirstPage () {
    this.nextPage = 1;
    
    this.goToNextPage.emit(this.nextPage);
  }

  clickPreviousPage () {
    if (this.pagination.isFirstPage || this.pagination.currentPage <= 1) {
      this.nextPage = 1;
    } else {
      this.nextPage = Number(this.pagination.currentPage) - 1;
    }

    this.goToNextPage.emit(this.nextPage);
  }

  clickNextPage () {
    if (this.pagination.isLastPage 
      || this.pagination.currentPage >= this.pagination.totalPages) {
      this.nextPage = this.pagination.currentPage;
    } else {
      this.nextPage = Number(this.pagination.currentPage) + 1;
    }
    
    this.goToNextPage.emit(this.nextPage);
  }

  clickLastPage () {
    this.nextPage = this.pagination.totalPages;
    
    this.goToNextPage.emit(this.nextPage);
  }
}
