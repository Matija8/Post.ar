import { Component, OnInit } from '@angular/core';
import { LoginData } from 'src/app/models/User';
import { AuthService } from 'src/app/services/mail-services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'postar-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: string;
  public password: string;
  public warning: 'hidden'|'visible';

  constructor(
    private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.warning = 'hidden';
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
        this.warning = 'visible';
      }
    );

  }

}
