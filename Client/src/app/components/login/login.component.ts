import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'postar-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  UserData: User;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  LogIn() {
    alert(this.email + ' ' + this.password);
    this.UserData = new User(this.email, this.password);

    this.auth.userLogin(this.UserData)
    .subscribe(
      res => console.log(res),
      err => console.log(err)
    );

  }

}
