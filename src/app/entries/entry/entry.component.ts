import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

import { EntryService } from '../shared/entry.service';
import { Entry } from '../shared/entry.model';

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
    private entryService: EntryService
  ) {}

  ngOnInit() {
  }

  onUpVote() {
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
