import { Component, OnInit } from '@angular/core';
import { LoginData } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'postar-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  LogIn() {
    const loginData: LoginData = { email: this.email, password: this.password };
    this.auth.userLogin(loginData)
    .subscribe(
      (res: any) => {
        // TODO: set response and error types (interface response...)
        console.log(res);

        alert(`Welcome`);
        this.router.navigate(['/inbox']);
      },
      (err: any) => {
        alert(`Sorry, couldn't login...`);
        console.log(err);
      }
    );

  }

}
