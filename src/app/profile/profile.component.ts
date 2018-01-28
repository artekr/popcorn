import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  private username: string = '';
  private pronoun : string = '';

  constructor(
    private profileService: ProfileService,
    private route         : ActivatedRoute,
    private cookieService : CookieService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
      params => { 
        this.username = params.username;
        if (this.cookieService.check('username')) {
          if (this.username == this.cookieService.get('username')){
            this.pronoun = '我';
          } else {
            this.pronoun = 'Ta';
          }
        }
        this.profileService.updateUser(this.username);
      }
    );
    
  }

}
