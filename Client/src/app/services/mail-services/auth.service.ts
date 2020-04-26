import { Injectable } from '@angular/core';
import { User, LoginData, RegisterData } from '../../models/User';
import { Observable, BehaviorSubject } from 'rxjs';
import { SecretarService } from '../secretar/secretar.service';
import { CookieService } from 'ngx-cookie-service';
import { GetMailService } from './get-mail.service';
import { HttpWrapperService } from './http-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly registerUrl = 'http://localhost:8000/register';
  private readonly loginUrl = 'http://localhost:8000/login';

  private readonly userDataSource: BehaviorSubject<User>;
  public readonly currentUserData: Observable<User>;

  constructor(
    private http: HttpWrapperService,
    private secretar: SecretarService,
    private cookie: CookieService,
    private getMail: GetMailService
  ) {
    // TODO: get user data on start (keep me logged in...)
    this.userDataSource = new BehaviorSubject<User>(null);
    this.currentUserData = this.userDataSource.asObservable();
  }


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

    response.subscribe(
      (res: any) => {
        const userData = this.secretar.decrypt(
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
