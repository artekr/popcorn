import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProfileService } from '../profile.service';
import { User } from '../../core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileHeaderComponent implements OnInit {

  user: User = new User();
  subscription: Subscription;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.subscription = this.profileService.getUserSubject().subscribe(
      user => this.user = user,
      error => console.log(error)
    );
    console.log("ProfileHeaderComponent:");
    console.log(this.user);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
