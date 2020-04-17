import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthService) {}

  canActivate(): boolean {
    if (!this.auth.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/logout']);
    }
    return false;
  }

}
