import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { 
  Entry,
  EntryService
} from '../../entries';

@Component({
  selector: 'app-discovery',
  templateUrl: './discovery.component.html',
  styleUrls: ['./discovery.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DiscoveryComponent implements OnInit {

  entries: Entry[];

  constructor(private entryService: EntryService) { }

  ngOnInit() {
    this.queryEntries();
  }

  queryEntries(): void {
    this.entryService.getRandomEntries()
        .subscribe(entries => this.entries = entries);
  }
}
