import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../mail-services/auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthFirstGuard implements CanActivate {

  constructor(private auth: AuthService) {}

  canActivate(): Observable<boolean> {
    // Always allow, just try to log in first.
    if (this.auth.loggedIn()) {
      return of(true);
    }
    if (this.auth.keepMeLoggedIn || this.auth.oneTabLoggedIn) {
      return this.auth.tryToLoginBySessionID().pipe(
        take(1),
        map(_ => true)
      );
    }
    return of(true);
  }

}
