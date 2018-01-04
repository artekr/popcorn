import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
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
  pages: number[];

  constructor() { }

  ngOnInit() {
    $('.ui.dropdown.pagination').dropdown();
    this.update();
  }

  update() {
    this.pages = [];
    console.log("this.pagination.totalPages: " + this.pagination.totalPages);
    for (var _i = 0; _i < this.pagination.totalPages; _i++) {
      console.log(_i);
      this.pages.push(_i + 1);
    }
  }

}
