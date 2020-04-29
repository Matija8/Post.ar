import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginData } from 'src/app/models/User';
import { AuthService } from 'src/app/services/mail-services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SecretarService } from 'src/app/services/secretar/secretar.service';

@Component({
  selector: 'postar-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public email: string;
  public password: string;
  public warning: 'hidden'|'visible';

  private subscription: Subscription = null;

  constructor(private auth: AuthService, private router: Router, private secretar: SecretarService) {}

  ngOnInit(): void {
    this.warning = 'hidden';
  }

  ngOnDestroy(): void {
    if (this.subscription !== null) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  LogIn(): void {
    if (this.subscription !== null) {
      this.subscription.unsubscribe();
    }
    const loginData: LoginData = { email: this.email, password: this.password };
    this.subscription = this.auth.userLogin(loginData)
    .subscribe(
      (res: any) => {
        console.log(this.secretar.decryptAndVerify(res.payload.data, res.payload.secret, res.payload.hash));
        this.router.navigate(['/inbox']);
      },
      (err: any) => {
        console.log('Error from userLogin:', err);
        this.warning = 'visible';
      }
    );
  }

}
