import { Injectable } from '@angular/core';
import { User, LoginData, RegisterData } from '../../models/User';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { SecretarService } from '../secretar/secretar.service';
import { CookieService } from 'ngx-cookie-service';
import { GetMailService } from './get-mail.service';
import { HttpWrapperService } from './http-wrapper.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly keepMeLoggedInToken = 'keepMeLoggedIn';

  private readonly userDataSource = new BehaviorSubject<User>(null);
  public readonly currentUserData = this.userDataSource.asObservable();

  constructor(
    private http: HttpWrapperService,
    private secretar: SecretarService,
    private cookie: CookieService,
    private getMail: GetMailService
  ) {}

  registerUser(user: RegisterData): Observable<object> {
    return this.http.post('http://localhost:8000/register', {
      name: user.name,
      surname: user.surname,
      username: user.email,
      password: user.password
    });
  }

  userLogin(user: LoginData): Observable<object> {
    const response = this.http.post('http://localhost:8000/login', {
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

  sessionIdExists() {
    return this.cookie.check('SESSIONID');
  }

  get keepMeLoggedIn(): boolean {
    return !!localStorage.getItem(this.keepMeLoggedInToken);
  }

  set keepMeLoggedIn(yes: boolean) {
    if (yes) {
      localStorage.setItem(this.keepMeLoggedInToken, 'active');
    } else {
      localStorage.removeItem(this.keepMeLoggedInToken);
    }
  }

  userLoginBySessionID() {
    if (!this.sessionIdExists) {
      return throwError('SESSIONID does\'nt exist');
    }
    const response = this.http.get('http://localhost:8000/checkSession');
    response
    .pipe(take(1))
    .subscribe(
      (res: any) => {
        console.log(res);
        const userData = this.secretar.decryptAndVerify(
          res.payload.data,
          res.payload.secret,
          res.payload.hash
        );
        if (!userData) {
          console.log('userData:', userData);
          this.userDataSource.error('userLoginBySessionID userData is falsy!');
          this.userDataSource.next(null);
          return;
        }
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
