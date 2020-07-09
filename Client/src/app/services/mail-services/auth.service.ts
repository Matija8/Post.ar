import { Injectable } from '@angular/core';
import { User, LoginData, RegisterData } from '../../models/User';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { SecretarService } from '../secretar/secretar.service';
import { CookieService } from 'ngx-cookie-service';
import { GetMailService } from './get-mail.service';
import { HttpWrapperService } from './http-wrapper.service';
import { take, flatMap, skipWhile, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Endpoint } from 'src/app/endpoint';
import { ChangeThemeService, Theme } from '../ui-services/change-theme.service';

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
    private changeTheme: ChangeThemeService,
  ) {
    // Log out on all tabs when logging out.
    window.addEventListener('storage', this.oneTabLoggedInChange.bind(this));

    // React to unauthorized errors on http requests.
    http.UnauthorizedEmitter.subscribe(() => {
      console.log('Unauthorized! Logging out.');
      if (this.loggedIn()) {
        this.userLogout();
      }
    });

    // Update theme on login/logout.
    this.currentUserData.subscribe((userData: User) => {
      if (userData === null) {
        // Logout or initial app opening.
        this.changeTheme.theme = this.changeTheme.defaultTheme;
        return;
      }
      console.log('User: ', userData);
      const userTheme: Theme = userData.theme ?
        (`theme-${userData.theme}` as Theme) : 'theme-default';
      this.changeTheme.theme = userTheme;
    });
  }

  registerUser(user: RegisterData): Observable<object> {
    return this.http.post(Endpoint.REGISTER, {
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
      // If there was a login on another tab -> login here as well.
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
      // If there was a logout on another tab -> logout on this tab also.
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
    return this.http.post(Endpoint.LOGIN, user).pipe(
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
    return this.http.get(Endpoint.USER + '/checkSession')
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
    return this.getMail.emptyFolders().pipe( // 1) Empty folders.
      flatMap(_ => { // 2) Set user data to null.
        this.userDataSource.next(null);
        return this.currentUserData.pipe(
          skipWhile(userData => userData !== null),
          take(1)
        );
      }),
      flatMap(_ => { // 3) Tell the server to remove this session.
        return this.http.get(Endpoint.LOGOUT).pipe(
          catchError(err => of(true)), // The server is down, otherwise this always succeeds.
          take(1)
        );
      }),
      flatMap(_ => { // Clean up.
        this.cookie.delete('SESSIONID');
        this.oneTabLoggedIn = false;
        return of(true);
      }),
    );
  }

  loggedIn(): boolean {
    return !!this.userDataSource.getValue();
  }

}
