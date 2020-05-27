import { Injectable } from '@angular/core';
import { User, LoginData, RegisterData } from '../../models/User';
import { Observable, BehaviorSubject, throwError, of, zip } from 'rxjs';
import { SecretarService } from '../secretar/secretar.service';
import { CookieService } from 'ngx-cookie-service';
import { GetMailService } from './get-mail.service';
import { HttpWrapperService } from './http-wrapper.service';
import { take, flatMap, skipWhile, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly keepMeLoggedInToken = 'keepMeLoggedIn';
  private readonly loggedInToken = 'loggedIn';

  private readonly userDataSource = new BehaviorSubject<User>(null);
  public readonly currentUserData = this.userDataSource.asObservable();

  constructor(
    private http: HttpWrapperService,
    private secretar: SecretarService,
    private cookie: CookieService,
    private getMail: GetMailService,
    private router: Router,
  ) {
    window.addEventListener('storage', this.oneTabLoggedInChange.bind(this));
  }

  registerUser(user: RegisterData): Observable<object> {
    return this.http.post('http://localhost:8000/register', {
      name: user.name,
      surname: user.surname,
      username: user.email,
      password: user.password
    });
  }

  private sessionIdExists() {
    return this.cookie.check('SESSIONID');
  }

  public get keepMeLoggedIn(): boolean {
    return !!localStorage.getItem(this.keepMeLoggedInToken);
  }

  public set keepMeLoggedIn(yes: boolean) {
    if (yes) {
      localStorage.setItem(this.keepMeLoggedInToken, 'active');
    } else {
      localStorage.removeItem(this.keepMeLoggedInToken);
    }
  }

  public get oneTabLoggedIn(): boolean {
    return !!localStorage.getItem(this.loggedInToken);
  }

  public set oneTabLoggedIn(yes: boolean) {
    if (yes) {
      localStorage.setItem(this.loggedInToken, 'active');
    } else {
      localStorage.removeItem(this.loggedInToken);
    }
  }

  public oneTabLoggedInChange(): void {
    if (this.oneTabLoggedIn) {
      if (!this.loggedIn()) {
        this.tryToLoginBySessionID()
        .pipe(take(1))
        .subscribe(loggedIn => {
          if (loggedIn) {
            this.router.navigate(['/inbox']);
          }
        });
        return;
      }
    } else {
      if (this.loggedIn()) {
        this.userLogout()
        .pipe(take(1))
        .subscribe(loggedOut => {
          if (loggedOut) {
            this.router.navigate(['/login']);
          }
        });
        return;
      }
    }
  }

  public userLogin(user: LoginData): Observable<User> {
    return this.http.post('http://localhost:8000/login', user).pipe(
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
          this.oneTabLoggedIn = true;
          return this.currentUserData.pipe(
            skipWhile(data => data !== userData),
            take(1)
          );
        }
      )
    );
  }

  private userLoginBySessionID() {
    if (!this.sessionIdExists()) {
      return throwError('SESSIONID doesn\'t exist. This is ok.');
    }
    return this.http.get('http://localhost:8000/user/checkSession')
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
          this.oneTabLoggedIn = true;
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

  public userLogout(): Observable<boolean> {
    this.userDataSource.next(null);
    return zip(
      this.getMail.emptyFolders(),
      this.currentUserData.pipe(skipWhile(userData => userData !== null)),
      this.http.get('http://localhost:8000/logout').pipe(take(1))
    ).pipe(
      flatMap(_ => {
        this.cookie.delete('SESSIONID');
        this.oneTabLoggedIn = false;
        return of(true);
      }),
      take(1)
    );
  }

  loggedIn(): boolean {
    return !!this.userDataSource.getValue();
  }

}
