import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Message, MESSAGE_TYPE } from '../model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MessageComponent implements OnInit {
  @Input() message: Message;

  constructor() { }

  ngOnInit() {
  }

}
