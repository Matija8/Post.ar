import { Component, OnInit } from '@angular/core';
import { LoginData } from 'src/app/models/User';
import { AuthService } from 'src/app/services/mail-services/auth.service';
import { Router } from '@angular/router';
import { SecretarService } from 'src/app/services/secretar/secretar.service';
import { take, skipWhile } from 'rxjs/operators';

@Component({
  selector: 'postar-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: string;
  public password: string;
  public warning: 'hidden'|'visible';
  private requestPending: boolean;

  constructor(private auth: AuthService, private router: Router, private secretar: SecretarService) {}

  ngOnInit(): void {
    this.warning = 'hidden';
    this.requestPending = false;
  }

  LogIn(): void {
    if (this.requestPending) {
      return;
    }
    this.requestPending = true;
    const loginData: LoginData = { email: this.email, password: this.password };
    this.auth.userLogin(loginData)
    .pipe(take(1))
    .subscribe(
      (res: any) => {
        console.log(this.secretar.decryptAndVerify(res.payload.data, res.payload.secret, res.payload.hash));
        this.auth.currentUserData.pipe(skipWhile(userData => !userData), take(1)).subscribe(
          _ => this.router.navigate(['/inbox'])
        );
      },
      (err: any) => {
        this.requestPending = false;
        console.log('Error from userLogin:', err);
        this.warning = 'visible';
      }
    );
  }

}
