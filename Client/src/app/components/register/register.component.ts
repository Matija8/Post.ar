import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';


@Component({
  selector: 'postar-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string;
  password: string;

  registeredUser: User;
  constructor() { }

  ngOnInit(): void {
  }

  registerUser() {
    // validacija podataka
    // provera da li je korisnik vec registrovan
    alert(this.email + ' ' + this.password);
    this.registeredUser = new User(this.email, this.password);
  }

}
