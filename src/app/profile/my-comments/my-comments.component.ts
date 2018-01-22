import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../../core';
import { Subscription } from 'rxjs/Subscription';
import { ProfileService } from '../profile.service';
import { Message, MESSAGE_TYPE, Pagination } from '../../shared';
import { JPAPagination } from '../../shared/model';
import { ApiService } from '../../core';
import { HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Comment } from "../../entries";

@Component({
  selector: 'app-my-comments',
  templateUrl: './my-comments.component.html',
  styleUrls: ['./my-comments.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MyCommentsComponent implements OnInit {

  comments: Comment[] = new Array<Comment>();

  user: User = new User();
  subscription: Subscription;

  message: Message = new Message();

   // Endpoint returns JPAPagination, list is the parameter "content".
   jpaPagination: JPAPagination = new JPAPagination();

  // For pagination component.
  pagination: Pagination = new Pagination();
  page: number = 0;
  defaultPageSize: number = 3;

  constructor(private profileService: ProfileService,
              private apiService: ApiService) { }

  ngOnInit() {
    this.user.id = 0;
    this.subscription = this.profileService.getUserSubject().subscribe(
      user => {
        this.user = user;
        this.getMyComments ();
      },
      error => console.log(error)
    );
  }

  getMyComments () {
    const params = new HttpParams()
      .set('create_user_id', this.user.id + '')
      // .set('sort', 'createTime,desc')
      .set('page', (this.page - 1) + '') // first page is 0 in stupid JPA. So page need to minus 1. 
      .set('size', this.defaultPageSize + '')
      .set('with_entry', 'true');

      this.apiService.get("/comments", params).subscribe(
        response => {
          //The endpoint should return Pagination object
          this.jpaPagination = response;
          this.comments = this.jpaPagination.content;
  
          if (this.comments.length <= 0) {
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

    this.getMyComments ();
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
