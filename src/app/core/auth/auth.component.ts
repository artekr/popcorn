import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService } from '../user.service';
import {
  AlertService, SharedModule
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
    if(SharedModule.isMobile.any()) {
      $('.auth-wrapper').removeClass("three").addClass("one");
    }
    
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

  onSubmitForm() {
    var router       = this.router; 
    var authType     = this.authType;
    var authForm     = this.authForm;
    var userService  = this.userService;
    var alertService = this.alertService;
    $('#login-form')
      .form({
        on: 'blur',
        fields: {
          username: {
            identifier : 'username',
            rules: [
              {
                type   : 'empty',
                prompt : '用户名不能为空哦'
              }
            ]
          },
          email: {
            identifier : 'email',
            rules: [
              {
                type   : 'email',
                prompt : '请填写有效的邮箱地址'
              }
            ]
          },
          password: {
            identifier : 'password',
            rules: [
              {
                type   : 'empty',
                prompt : '密码不能为空哦'
              }
            ]
          }
        },
        onSuccess(event, fields){
          console.log(authType);
          if (authType === 'register') {
            authForm.patchValue({ email: authForm.get('user_identity').value });
          }
          const credentials = authForm.value;
          console.log(credentials);
          userService.attemptAuth(authType, credentials)
            .subscribe(
              data => router.navigateByUrl('/'),
              error => {
                alertService.warning("啊哦", error);
              }
            );
        },
        onFailure(formErrors, fields){
          console.log("Failure!");
        }
      }).form("validate form");
  }

}