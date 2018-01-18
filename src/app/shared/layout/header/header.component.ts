import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from "@angular/router";

import { CookieService } from 'ngx-cookie-service';

import { AddEntryComponent } from '../add-entry/add-entry.component';
import { User } from '../../../core/user.model';
import { UserService } from '../../../core/user.service';
import { AlertService } from '../../services';
import { environment } from '../../../../environments/environment';

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

    this.searchInit();
  }

  searchInit() {
    $('.ui.search')
      .search({
        // type       : 'category',
        minCharacters : 3,
        apiSettings   : {
          onResponse: function(searchResponse) {
            /*
            // For category usage
            var response = {
              results : []
            };
            */
            var response = {
                results : []
              };
            // translate API response to work with search
            $.each(searchResponse, function(index, item) {
              var
                type       = '词条',
                maxResults = 8
              ;
              if(index >= maxResults) {
                return false;
              }
              /*
              // create new type category
              if(response.results[type] === undefined) {
                response.results[type] = {
                  name    : type,
                  results : []
                };
              }
              // add result to category
              response.results[type].results.push({
                title : item.name,
              });
              */
              response.results.push({
                title : item.name,
                // TODO: replace proper url
                url: '/entry/'+item.name
              });
            });
            return response;
          },
          url: `${environment.api_url}`+'/entries/suggestions/{query}',
          headers: {
            'contentType': 'application/json',
            'Accept'     : 'application/json',
            'time_zone'  : 'UTC-05:00'
          },
        }
      });
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
