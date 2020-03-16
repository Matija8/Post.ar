import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'postar-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  UserData: User;

  constructor() { }

  ngOnInit(): void {
  }

  LogIn() {
    alert(this.email + ' ' + this.password);
    this.UserData = new User(this.email, this.password);

  }

}
