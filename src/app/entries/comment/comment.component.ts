import { Component, OnInit, ViewEncapsulation, Input, Pipe, PipeTransform } from '@angular/core';

import { Comment } from '../shared/comment.model';
import { ApiService } from '../../core/api.service';

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

  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit() {
  }

  onSubmitComment() {
    if (this.comment) {
      console.log("input: " + this.comment);
      var commentObject = {
        content: this.comment
      };
      this.apiService.post('/entries/' + String(this.entry_id) + '/comments', commentObject)
        .subscribe(
          data => {
            console.log(data);
            this.comments.unshift(data);
            this.comment = "";
          },
          error => {
            console.log("error " + error);
          }
        );
    }
  }


}
