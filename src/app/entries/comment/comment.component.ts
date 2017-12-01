import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

import { Comment } from '../shared/comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CommentComponent implements OnInit {
  @Input() comments: Comment[];

  constructor() { }

  ngOnInit() {
  }

}
