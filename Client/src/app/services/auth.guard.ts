import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  private loggedIn = AuthService.prototype.loggedIn;

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (this.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
    return false;
  }

}
