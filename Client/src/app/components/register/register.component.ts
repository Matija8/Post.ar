import { Component, OnInit } from '@angular/core';
import { RegisterData } from 'src/app/models/User';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/mail-services/auth.service';


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
  registrationData: RegisterData;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  registerUser() {
    this.registrationData = {
      name: this.name,
      surname: this.surname,
      email: this.email,
      password: this.password
    };

    this.auth.registerUser(this.registrationData)
    .subscribe(
      (res: any) => {
        console.log(`Response from registerUser:\n${res}`);
        alert('You have successfuly registered!\nYou will now be redirected to the login page');
        this.router.navigate(['/login'])
        .then(() => alert(`You can log in now`));
      },
      (err: any) => {
        console.log(`Error from registerUser:\n${err}`);
        alert(`Sorry, failed to register...`);
      }
    );
  }

}
