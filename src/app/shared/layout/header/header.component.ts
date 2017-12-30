import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from "@angular/router";

import { CookieService } from 'ngx-cookie-service';

import { AddEntryComponent } from '../add-entry/add-entry.component';
import { User } from '../../../core/user.model';
import { UserService } from '../../../core/user.service';
import { AlertService } from '../../services';

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
  username: string;

  constructor(
    private cookieService: CookieService,
    private userService : UserService,
    private alertService: AlertService,
    private router      : Router
  ) {}

  ngOnInit() {
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
        this.username = userData.username;
      }
    )
    if (this.cookieService.check("username")) {
      this.username = this.cookieService.get("username");
    }
  }

  showAddEntryModal() {

    if (this.cookieService.check("jwt")) {
      AddEntryComponent.openAddEntryModal();
    } else {
      this.alertService.error("啊啊","朋友请先登录");
    }
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
