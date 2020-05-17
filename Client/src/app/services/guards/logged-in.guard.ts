import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../mail-services/auth.service';
import { take, map, catchError, skipWhile, flatMap } from 'rxjs/operators';
import { Observable, observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthService) {}

  canActivate(): boolean | Observable<boolean> {
    if (this.auth.loggedIn()) {
      this.router.navigate(['/inbox']);
      return false;
    }
    if (this.auth.keepMeLoggedIn) { // Keep me logged in set, try to login before going to the login page.
      this.auth.userLoginBySessionID();
      return this.auth.userLoginBySessionID()
      .pipe(
        take(1),
        map(_ => true), // Send true to flatMap (Login success).
        catchError(
          (err: any) => {
            this.auth.keepMeLoggedIn = false;
            return of(false); // Send false to flatMap (Login failure).
          }),
        flatMap(
          (logInSuccessful) => {
            if (!logInSuccessful) {
              return of(true); // Login failed, you can go to the login page now.
            }
            return this.auth.currentUserData.pipe( // Login successful, wait for userData change.
              skipWhile(userData => userData === null), take(1),
              map( _ => {
                this.router.navigate(['/inbox']);
                return false;
              }),
              catchError(err => {
                console.log(err);
                return of(true);
              })
            );
          }
        )
      );
    }
    return true;
  }

}
