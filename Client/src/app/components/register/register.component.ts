import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'postar-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string;
  password: string;

  registeredUser: User;
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  registerUser() {
    // validacija podataka
    // provera da li je korisnik vec registrovan
    alert(this.email + ' ' + this.password);
    this.registeredUser = new User(this.email, this.password);
    this.auth.registerUser(this.registeredUser)
    .subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }

}
