import { Component, OnInit, ViewEncapsulation, Input, Pipe, PipeTransform } from '@angular/core';
import { Router } from "@angular/router";

import { CookieService } from 'ngx-cookie-service';

import { Comment } from '../shared/comment.model';
import { ApiService } from '../../core/api.service';

declare var $: any;

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CommentComponent implements OnInit {
  @Input() comments: Comment[];
  @Input() entry_id: number;

  private comment: string = "";
  private currentUserId: string = "";

  constructor(
    private apiService   : ApiService,
    private cookieService: CookieService,
    private router       : Router
  ) {}

  ngOnInit() {
    if (this.cookieService.check('userid')) {
      this.currentUserId = this.cookieService.get('userid');
    }
  }

  onDeleteComment(comment_id: number, comment: Comment) {
    this.apiService.delete('/entries/' + String(this.entry_id) + '/comments/' + String(comment_id))
        .subscribe(
          data => {
            this.comments.splice(this.comments.indexOf(comment), 1);
          },
          error => {
            // TODO: error handling
            console.log("error " + error);
          }
        );
  }

  onSubmitComment() {
    if (this.comment) {
      if (!this.cookieService.check('userid')) {
        var router = this.router;
        $('#loginAlertModal')
          .modal({
            blurring  : true,
            onApprove : function() {
              router.navigateByUrl('/login');
            }
          })
          .modal('show')
        return
      }
      var commentObject = {
        content: this.comment
      };
      this.apiService.post('/entries/' + String(this.entry_id) + '/comments', commentObject)
        .subscribe(
          data => {
            this.comments.unshift(data);
            this.comment = "";
          },
          error => {
            // TODO: error handling
            console.log("error " + error);
          }
        );
    }
  }


}
