import { Component, OnInit } from '@angular/core';
import { LoginData } from 'src/app/models/User';
import { AuthService } from 'src/app/services/mail-services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SecretarService } from 'src/app/services/secretar/secretar.service';

@Component({
  selector: 'postar-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  public warning = {visibility: 'hidden'};

  constructor(
    private auth: AuthService, private router: Router,
    private cookieService: CookieService, private secretar: SecretarService) { }

  ngOnInit(): void {
    this.warning.visibility = 'hidden';
  }

  LogIn() {
    const loginData: LoginData = { email: this.email, password: this.password };
    this.auth.userLogin(loginData)
    .subscribe(
      (res: any) => {
        this.router.navigate(['/inbox']);
      },
      (err: any) => {
        console.log('Error from userLogin:', err);
        this.warning.visibility = 'visible';
      }
    );

  }

}
