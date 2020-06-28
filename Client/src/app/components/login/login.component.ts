import { Component, OnInit } from '@angular/core';
import { LoginData, User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/mail-services/auth.service';
import { Router } from '@angular/router';
import { SecretarService } from 'src/app/services/secretar/secretar.service';

@Component({
  selector: 'postar-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Form data:
  public email = '';
  public password = '';

  public warning: 'hidden'|'visible';
  private requestPending: boolean;

  constructor(private auth: AuthService, private router: Router, private secretar: SecretarService) {}

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
    this.requestPending = true;
    this.warning = 'hidden';
    const email = this.email.trim();
    const username = email.endsWith('@post.ar') ? email : `${email}@post.ar`;
    const loginData: LoginData = {
      username,
      password: this.password,
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

  validParams(): boolean {
    const validEmail = /^[a-zA-Z][a-zA-Z_0-9]*?(@post\.ar)?$/.test(this.email.trim());
    return validEmail && (this.password !== '');
  }

}
