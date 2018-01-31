import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Entry } from '../../entries';
import { ENTRIES } from "../../mock-entries";
import { Message, MESSAGE_TYPE, Pagination } from '../../shared';
import { HttpParams, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../core';
import { AlertService } from '../../shared/services';
import { JPAPagination } from '../../shared/model';
import { User } from '../../core';
import { Subscription } from 'rxjs/Subscription';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-my-entries',
  templateUrl: './my-entries.component.html',
  styleUrls: ['./my-entries.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MyEntriesComponent implements OnInit {
  user: User = new User();
  subscription: Subscription;

  // Endpoint return this type, entry list is parameter content.
  jpaPagination: JPAPagination = new JPAPagination();
  entries: Entry[] = new Array<Entry>();
  
  // For pagination component.
  pagination: Pagination = new Pagination();
  page: number = 0;
  defaultPageSize: number = 10;

  message: Message = new Message();

  constructor(
    private apiService: ApiService,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.user.id = 0;
    this.subscription = this.profileService.getUserSubject().subscribe(
      user => {
        this.user = user;
        this.getEntries ();
      },
      error => console.log(error)
    );
  }

  getEntries() {
    const params = new HttpParams()
      .set('create_user_id', this.user.id + '')
      .set('sort', 'createTime,desc')
      .set('page', (this.page - 1) + '') // first page is 0 in stupid JPA. So page need to minus 1. 
      .set('size', this.defaultPageSize + '')
      .set('with_comments', 'true');

    this.apiService.get("/entries/pagination", params).subscribe(
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
  goNextPage(nextPage: number) {
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
