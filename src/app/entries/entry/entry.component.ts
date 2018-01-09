import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Router } from "@angular/router";

import { CookieService } from 'ngx-cookie-service';

import { EntryService } from '../shared/entry.service';
import { Entry } from '../shared/entry.model';

declare var $: any;

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EntryComponent implements OnInit {
  @Input() entry: Entry = new Entry();

  showComment: boolean = false;

  constructor(
    private entryService : EntryService,
    private cookieService: CookieService,
    private router       : Router
  ) {}

  ngOnInit() {
  }

  onUpVote() {
    // Only logged in user allow to upvote
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
    this.entryService.upVoteEntry(this.entry.id)
      .subscribe(
        data => {
          this.entry.upVotesCount += 1;
        },
        error => {
          // TODO: Error handling
          console.log("error " + error);
        }
      );
  }

  onDownVote() {
    // Only logged in user allow to downvote
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
    this.entryService.downVoteEntry(this.entry.id)
      .subscribe(
        data => {
          this.entry.downVotesCount += 1;
        },
        error => {
          // TODO: Error handling
          console.log("error " + error);
        }
      );
  }


}
