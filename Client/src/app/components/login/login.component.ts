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

  public email: string;
  public password: string;
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

  LogIn(): void {
    if (this.requestPending) {
      return;
    }
    this.requestPending = true;
    const loginData: LoginData = { email: this.email, password: this.password };
    this.auth.userLogin(loginData)
    .subscribe(
      (userData: User) => {
        this.requestPending = false;
        // console.log(userData);
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
