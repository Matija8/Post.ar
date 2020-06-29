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
  public name = '';
  public surname = '';
  public email = '';
  public password = '';
  public retypePassword = '';

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
      name: this.name.trim(),
      surname: this.surname.trim(),
      email: this.email.trim(),
      password: this.password.trim()
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

  validParams(): boolean {
    const nameReg = /^[a-zA-Z][a-zA-Z']*$/;
    const validName = nameReg.test(this.name.trim()) && nameReg.test(this.surname.trim());

    const validPasswdLen = (this.password.length >= 8) && (this.password.length <= 64);
    const validPasswd = validPasswdLen && (this.password === this.retypePassword);
    const validEmail = /^([a-zA-Z][a-zA-Z_0-9]*$)/.test(this.email.trim());

    return validName && validPasswd && validEmail;
  }

}
