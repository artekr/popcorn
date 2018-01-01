import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { 
  Entry,
  EntryService
} from '../../entries';

@Component({
  selector: 'app-hot',
  templateUrl: './hot.component.html',
  styleUrls: ['./hot.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HotComponent implements OnInit {

  entries: Entry[];

  constructor(private entryService: EntryService) { }

  ngOnInit() {
    this.queryEntries();
  }

  queryEntries(): void {
    this.entryService.query("hot_entries")
        .subscribe(entries => this.entries = entries);
  }

}
