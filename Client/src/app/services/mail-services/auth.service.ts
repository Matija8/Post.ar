import { Injectable } from '@angular/core';
import { User, LoginData, RegisterData } from '../../models/User';
import { Observable, BehaviorSubject } from 'rxjs';
import { SecretarService } from '../secretar/secretar.service';
import { CookieService } from 'ngx-cookie-service';
import { GetMailService } from './get-mail.service';
import { HttpWrapperService } from './http-wrapper.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly registerUrl = 'http://localhost:8000/register';
  private readonly loginUrl = 'http://localhost:8000/login';

  private readonly userDataSource = new BehaviorSubject<User>(null);
  public readonly currentUserData = this.userDataSource.asObservable();

  constructor(
    private http: HttpWrapperService,
    private secretar: SecretarService,
    private cookie: CookieService,
    private getMail: GetMailService
  ) {}


  registerUser(user: RegisterData): Observable<object> {
    return this.http.post(this.registerUrl, {
      name: user.name,
      surname: user.surname,
      username: user.email,
      password: user.password
    });
  }


  userLogin(user: LoginData): Observable<object> {
    const response = this.http.post(this.loginUrl, {
      username: user.email,
      password: user.password
    });

    response
    .pipe(take(1))
    .subscribe(
      (res: any) => {
        const userData = this.secretar.decryptAndVerify(
          res.payload.data,
          res.payload.secret,
          res.payload.hash
        );
        this.userDataSource.next(userData);
      },
      (err: any) => {
        console.log(err);
      }
    );

    return response;
  }

  userLogout(): void {
    this.userDataSource.next(null);
    this.cookie.delete('SESSIONID');
    Object.values(this.getMail.folders)
      .forEach(folder => folder.emptyFolder());
  }

  loggedIn(): boolean {
    return !!this.userDataSource.getValue();
  }


}
