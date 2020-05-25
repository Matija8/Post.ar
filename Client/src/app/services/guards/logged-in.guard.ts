import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../mail-services/auth.service';
import { map } from 'rxjs/operators';
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
    if (this.auth.keepMeLoggedIn || this.auth.oneTabLoggedIn) {
      return this.auth.tryToLoginBySessionID()
      .pipe(
        map(loginSuccessful => {
          if (loginSuccessful) {
            this.navigateToInbox();
            return false;
          } else {
            return true;
          }
        })
      );
    }
    return of(true);
  }

  navigateToInbox(): void {
    this.router.navigate(['/inbox']);
  }

}
