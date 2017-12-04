import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { User } from '../../../core/user.model';
import { UserService } from '../../../core/user.service';

declare var $: any;

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  currentUser: User;
  
  constructor(
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    )
  }

  showAddEntryModal() {
    $('.tiny.modal')
    .modal({
      blurring: true
    })
    .modal('show');
  }
}
