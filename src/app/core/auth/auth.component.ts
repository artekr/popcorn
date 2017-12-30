import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService } from '../user.service';
import {
  AlertService
} from '../../shared';

declare var jquery: any; 
declare var $: any

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
    private route        : ActivatedRoute,
    private router       : Router,
    private fb           : FormBuilder,
    private userService  : UserService,
    private alertService : AlertService
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
        this.authForm.addControl('email', new FormControl());
      }
    });
  }

  createForm() {
    this.authForm = this.fb.group({
      auth_name    : ['EMAIL'],
      user_identity: ['', Validators.required],
      password     : ['', Validators.required]
    });
  }

  get user_identity() { 
    return this.authForm.get('user_identity'); 
  }

  initFormValidation() {
    $('.ui.form')
      .form({
        on: 'blur',
        transition: 'shake',
        fields: {
          email: {
            identifier : 'email',
            rules: [
              {
                type   : 'email',
                prompt : 'email'
              }
            ]
          },
          password: {
            identifier : 'password',
            rules: [
              {
                type   : 'empty',
                prompt : 'pwd empty'
              }
            ]
          }
        }
      });
  }

  onSubmitForm() {
    if (this.authType === 'register') {
      this.authForm.patchValue({email: this.authForm.get('user_identity').value});
    }
    const credentials = this.authForm.value;
    console.log(credentials);
    this.userService.attemptAuth(this.authType, credentials)
      .subscribe(
        data => this.router.navigateByUrl('/'),
        error => {
          this.alertService.warning("啊哦", error);
        }
      );
  }

}