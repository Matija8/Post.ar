import { Injectable } from '@angular/core';
import { User, LoginData, RegisterData } from '../../models/User';
import { Observable, BehaviorSubject, throwError, of, zip } from 'rxjs';
import { SecretarService } from '../secretar/secretar.service';
import { CookieService } from 'ngx-cookie-service';
import { GetMailService } from './get-mail.service';
import { HttpWrapperService } from './http-wrapper.service';
import { take, flatMap, skipWhile, map, catchError } from 'rxjs/operators';

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

  userLogin(user: LoginData): Observable<User> {
    return this.http.post('http://localhost:8000/login', {
      username: user.email,
      password: user.password
    }).pipe(
      take(1),
      flatMap(
        (res: any) => {
          const userData = this.secretar.decryptAndVerify(
            res.payload.data,
            res.payload.secret,
            res.payload.hash
          );
          if (!userData) {
            return throwError('Failed to decrypt login server response.');
          }
          this.userDataSource.next(userData);
          return this.currentUserData.pipe(
            skipWhile(data => data !== userData),
            take(1)
          );
        }
      )
    );
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

  private userLoginBySessionID() {
    if (!this.sessionIdExists) {
      return throwError('SESSIONID does\'nt exist');
    }
    return this.http.get('http://localhost:8000/checkSession')
    .pipe(
      take(1),
      flatMap(
        (res: any) => {
          const userData = this.secretar.decryptAndVerify(
            res.payload.data,
            res.payload.secret,
            res.payload.hash
          );
          if (!userData) {
            return throwError('Failed to decrypt login server response.');
          }
          this.userDataSource.next(userData);
          return this.currentUserData.pipe(
            skipWhile(data => data !== userData),
            take(1)
          );
        }
      )
    );
  }

  public tryToLoginBySessionID(): Observable<boolean> {
    return this.userLoginBySessionID()
    .pipe(
      take(1),
      map(loginSuccess => {
        return true;
      }),
      catchError(
        (err: any) => {
          console.log(err);
          this.keepMeLoggedIn = false;
          return of(false);
        }
      )
    );
  }

  userLogout(): Observable<boolean> {
    this.userDataSource.next(null);
    this.keepMeLoggedIn = false;
    // this.cookie.delete('SESSIONID');
    return zip(
      this.getMail.emptyFolders(),
      this.currentUserData.pipe(skipWhile(userData => userData !== null))
    ).pipe(
      map(_ => true),
      take(1)
    );
  }

  loggedIn(): boolean {
    return !!this.userDataSource.getValue();
  }

}
