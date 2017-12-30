import { Component, OnInit, ViewEncapsulation } from '@angular/core';

declare var $: any;

@Component({
  selector: 'add-entry-modal',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddEntryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public static openAddEntryModal() {
    $('.tiny.modal')
    .modal({
      blurring: true
    })
    .modal('show');
  }
}
