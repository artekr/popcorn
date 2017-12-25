import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from "@angular/router";

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
  dropdownIsShow: boolean = false;

  constructor(
    private userService : UserService,
    private router      : Router
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

  showProfileDropdown() {
    if(this.dropdownIsShow) {
      $('.ui.dropdown')
      .dropdown('clear');
    } else {
      $('.ui.dropdown')
      .dropdown('show');
    }
    this.dropdownIsShow = !this.dropdownIsShow;
  }

  logout() {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }

}
