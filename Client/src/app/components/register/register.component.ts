import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'postar-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: string;
  surname: string;
  email: string;
  password: string;
  registeredUser: User;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  registerUser() {
    // TODO:
    // validacija podataka
    // provera da li je korisnik vec registrovan
    this.registeredUser = new User(this.name, this.surname, this.email, this.password);

    this.auth.registerUser(this.registeredUser)
    .subscribe(
      res => {
        console.log(res);

        // save token to local storage, server not sending token for registration
        //  localStorage.setItem('token', res.token);

        // TODO: login + set loggedInUserData

        alert('You have successfuly registered!\nYou will now be redirected to the login page');
        this.router.navigate(['/login'])
        .then(() => alert(`You can log in now`));
      },
      err => {
        console.log(err);
      }
    );
  }

}
