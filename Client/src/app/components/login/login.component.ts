import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
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
  UserData: User;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  LogIn() {
    alert(this.email + ' ' + this.password);
    this.UserData = new User(this.email, this.password);

    this.auth.userLogin(this.UserData)
    .subscribe(
      res => {
        console.log(res);
        // save token to local storage
        localStorage.setItem('token', res.data.token);

        this.router.navigate(['/inbox']);
      },
      err => console.log(err)
    );

  }

}
