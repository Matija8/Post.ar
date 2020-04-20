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

  constructor(
    private auth: AuthService, private router: Router,
    private cookieService: CookieService, private secretar: SecretarService) { }

  ngOnInit(): void {
  }

  LogIn() {
    const loginData: LoginData = { email: this.email, password: this.password };
    this.auth.userLogin(loginData)
    .subscribe(
      (res: any) => {
        console.log(`Response from userLogin:\n${res}`);

        // NOTE: vi ne postavljate kolacice, samo ih saljete pri svakom sledecem zahtevu
        // sve sto zelite da cuvate => session ili local storage

        /* this.cookieService.set('username' , res.payload.username);
        this.cookieService.set('name' , res.payload.name);
        this.cookieService.set('surname', res.payload.surname); */

        const userData = this.secretar.decrypt(
          res.payload.data,
          res.payload.secret,
          res.payload.hash
        );

        console.log(userData);

        alert(`Welcome`);
        this.router.navigate(['/inbox']);
      },
      (err: any) => {
        console.log(`Error from userLogin:\n${err}`);
        alert(`Sorry, couldn't login...`);
      }
    );

  }

}
