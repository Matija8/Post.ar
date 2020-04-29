import { Component, OnInit, OnDestroy } from '@angular/core';
import { RegisterData } from 'src/app/models/User';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/mail-services/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'postar-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  public name: string;
  public surname: string;
  public email: string;
  public password: string;
  public retypePassword: string;

  private subscription: Subscription = null;

  public warning: 'hidden'|'visible';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.warning = 'hidden';
  }

  ngOnDestroy(): void {
    if (this.subscription !== null) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  registerUser() {
    if (this.subscription !== null) {
      this.subscription.unsubscribe();
    }
    const registrationData: RegisterData = {
      name: this.name,
      surname: this.surname,
      email: this.email,
      password: this.password
    };
    this.subscription = this.auth.registerUser(registrationData)
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
