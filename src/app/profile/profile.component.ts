import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProfileService } from './profile.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  username: string = '';

  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute) {
      this.route.params.subscribe(params => this.username = params.username);
      this.profileService.updateUser(this.username);
  }

  ngOnInit() {
    
  }

}
