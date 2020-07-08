import { Component, OnInit } from '@angular/core';
import { LoginData, User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/mail-services/auth.service';
import { Router } from '@angular/router';
import { SecretarService } from 'src/app/services/secretar/secretar.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { correctEmail } from './loginValidator.validator';

@Component({
  selector: 'postar-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public submitted = false;

  public warning: 'hidden'|'visible';
  private requestPending: boolean;

  constructor(private auth: AuthService,
              private router: Router,
              private secretar: SecretarService,
              private formBuilder: FormBuilder)
  {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, correctEmail]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  public get keepMeLoggedIn(): boolean {
    return this.auth.keepMeLoggedIn;
  }

  public set keepMeLoggedIn(value: boolean) {
    this.auth.keepMeLoggedIn = value;
  }

  ngOnInit(): void {
    this.warning = 'hidden';
    this.requestPending = false;
    this.keepMeLoggedIn = this.auth.keepMeLoggedIn;
  }

  logIn(): void {
    if (this.requestPending) {
      return;
    }
    if (!this.submitted) {
      this.submitted = true;
    }
    if (this.loginForm.invalid){
      return;
    }
    this.requestPending = true;
    this.warning = 'hidden';
    const email = this.f.email.value.trim();
    const username = email.endsWith('@post.ar') ? email : `${email}@post.ar`;
    const loginData: LoginData = {
      username,
      password: this.f.password.value,
      keepMeLoggedIn: this.keepMeLoggedIn
    };
    this.auth.userLogin(loginData)
    .subscribe(
      (userData: User) => {
        this.requestPending = false;
        this.router.navigate(['/inbox']);
      },
      (err: any) => {
        this.requestPending = false;
        console.log('Error from userLogin:', err);
        this.warning = 'visible';
      }
    );
  }

}
