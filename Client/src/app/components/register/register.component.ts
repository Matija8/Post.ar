import { Component, OnInit } from '@angular/core';
import { RegisterData } from 'src/app/models/User';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/mail-services/auth.service';
import { take } from 'rxjs/operators';


@Component({
  selector: 'postar-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public name: string;
  public surname: string;
  public email: string;
  public password: string;
  public retypePassword: string;

  public warning: 'hidden'|'visible';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.warning = 'hidden';
  }

  registerUser() {
    const registrationData: RegisterData = {
      name: this.name,
      surname: this.surname,
      email: this.email,
      password: this.password
    };
    this.auth.registerUser(registrationData)
    .pipe(take(1))
    .subscribe(
      (res: any) => {
        console.log('Response from registerUser:', res);
        alert('You have successfuly registered!\nYou will now be redirected to the login page');
        this.router.navigate(['/login'])
        .then(() => alert(`You can log in now`));
      },
      (err: any) => {
        console.log('Error from registerUser:', err);
        this.warning = 'visible';
      }
    );
  }

  validParams() {
    return (this.name && this.surname && this.email && this.password && this.password === this.retypePassword);
  }

}
