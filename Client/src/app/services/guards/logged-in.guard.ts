import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../mail-services/auth.service';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthService) {}

  canActivate(): Observable<boolean> {
    if (this.auth.loggedIn()) {
      this.navigateToInbox();
      return of(false);
    }
    if (this.auth.keepMeLoggedIn) {
      return this.auth.tryToLoginBySessionID()
      .pipe(
        map(loginSuccess => {
          this.navigateToInbox();
          return false;
        }),
        catchError((err: any) => {
          console.log(err);
          return of(true);
        })
      );
    }
    return of(true);
  }

  navigateToInbox(): void {
    this.router.navigate(['/inbox']);
  }

}
