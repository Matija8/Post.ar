import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../mail-services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthService) {}

  canActivate(): boolean {
    if (!this.auth.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/inbox']);
    }
    return false;
  }

}
