import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Entry} from '../../entries';
import { ENTRIES } from "../../mock-entries";
import { Pagination, Message, MESSAGE_TYPE } from '../../shared';

@Component({
  selector: 'app-my-entries',
  templateUrl: './my-entries.component.html',
  styleUrls: ['./my-entries.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MyEntriesComponent implements OnInit {
  entries: Entry[];
  pagination: Pagination;
  message: Message = new Message();

  constructor() { }

  ngOnInit() {
    this.entries = ENTRIES;
    this.message.type = MESSAGE_TYPE.ERROR;
    this.message.content = 'sdfsdsdf';
  }

}
