import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { 
  Entry,
  EntryService
} from '../../entries';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class MainComponent implements OnInit {

  private entries: Entry[];

  constructor(private entryService: EntryService) { }

  ngOnInit() {
    this.queryEntries();
  }

  queryEntries(): void {
    this.entryService.query("latest_entries")
        .subscribe(entries => this.entries = entries);
  }

}
