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

  // Form data:
  public name: string;
  public surname: string;
  public email: string;
  public password: string;
  public retypePassword: string;

  public warning: 'hidden'|'visible';
  private requestPending: boolean;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.warning = 'hidden';
  }

  registerUser() {
    if (this.requestPending) {
      return;
    }
    const registrationData: RegisterData = {
      name: this.name,
      surname: this.surname,
      email: this.email,
      password: this.password
    };
    this.warning = 'hidden';
    this.auth.registerUser(registrationData)
    .subscribe(
      (res: any) => {
        this.requestPending = false;
        alert('You have successfuly registered!\nYou will now be redirected to the login page');
        this.router.navigate(['/login']);
      },
      (err: any) => {
        this.requestPending = false;
        console.log('Error from registerUser:', err);
        this.warning = 'visible';
      }
    );
  }

  validParams() {
    return (this.name && this.surname && this.email && this.password && this.password === this.retypePassword);
  }

}
