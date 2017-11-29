import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AuthComponent implements OnInit {
  authType: String = '';
  title: String = '';
  authForm: FormGroup;

  constructor(
    private route       : ActivatedRoute,
    private router      : Router,
    private userService : UserService,
    private fb          : FormBuilder
  ) { 
    this.createForm();
  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.authType = data[data.length - 1].path;
      // Set a title for the page accordingly
      this.title = (this.authType === 'login') ? '登录' : '注册';
      // add form control for username if this is the register page
      if (this.authType === 'register') {
        this.authForm.addControl('username', new FormControl());
      }
    });
  }

  createForm() {
    this.authForm = this.fb.group({
      'email'   : ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  onSubmitForm() {
    console.log("submit form");
    const credentials = this.authForm.value;
    this.userService.attemptAuth(this.authType, credentials)
      .subscribe(
        data => this.router.navigateByUrl('/')
        //Todo: error handling
      );

  }

}
